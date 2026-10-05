import json
import os
import sqlite3
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from runner import Store, run, validate


class WorkflowTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.store = Store(self.root / 'tasks.sqlite')

    def config(self, **commands):
        return {'roles': {r: [sys.executable, '-c', commands.get(r, 'print("ok")')]
                          for r in ('investigator', 'builder', 'verifier', 'operator')},
                'timeout_seconds': 2, 'max_attempts': 3, 'max_repairs': 2}

    def create(self, config=None, product='facelessforge'):
        return self.store.create(product, 'Get a downloadable MP4', config or self.config(), self.root)

    def test_persists_configuration_and_task_across_restart(self):
        config = self.config()
        task = self.create(config)
        config['max_repairs'] = 99
        reopened = Store(self.root / 'tasks.sqlite').status(task)
        self.assertEqual(reopened['config']['max_repairs'], 2)
        self.assertEqual(reopened['status'], 'planned')

    def test_success_records_roles_and_learning(self):
        task = self.create()
        result = run(self.store, task)
        self.assertEqual(result['status'], 'complete')
        self.assertEqual([e['role'] for e in result['events'] if e['kind'] == 'passed'],
                         ['investigator', 'builder', 'verifier', 'operator'])
        self.assertEqual(len(self.store.lessons('facelessforge')), 1)
        self.assertEqual(self.store.lessons('ethinx-short-form'), [])

    def test_verifier_failure_repairs_and_never_releases(self):
        result = run(self.store, self.create(self.config(verifier='print("bad dimensions"); exit(1)')))
        self.assertEqual(result['status'], 'blocked')
        self.assertFalse(any(e['role'] == 'operator' for e in result['events']))
        self.assertEqual(self.store.lessons('facelessforge'), [])

    def test_transient_retry_is_bounded_and_stops_identical_failure(self):
        result = run(self.store, self.create(self.config(investigator='print("unavailable"); exit(75)')))
        self.assertEqual(result['status'], 'blocked')
        self.assertEqual(len([e for e in result['events'] if e['kind'] == 'failed']), 2)

    def test_different_transient_failures_exhaust_attempt_limit(self):
        code = 'from pathlib import Path; p=Path("count"); n=int(p.read_text())+1 if p.exists() else 1; p.write_text(str(n)); print(n); exit(75)'
        result = run(self.store, self.create(self.config(investigator=code)))
        self.assertEqual(result['status'], 'blocked')
        self.assertEqual(len([e for e in result['events'] if e['kind'] == 'failed']), 3)

    def test_repair_can_succeed(self):
        code = 'from pathlib import Path; p=Path("verified"); exists=p.exists(); p.touch(); exit(0 if exists else 1)'
        result = run(self.store, self.create(self.config(verifier=code)))
        self.assertEqual(result['status'], 'complete')
        self.assertEqual(result['repairs'], 1)

    def test_permanent_error_is_not_retried(self):
        result = run(self.store, self.create(self.config(builder='exit(2)')))
        self.assertEqual(len([e for e in result['events'] if e['kind'] == 'failed']), 1)
        self.assertEqual(result['status'], 'blocked')

    def test_interrupted_execution_blocks_replay(self):
        task = self.create()
        with sqlite3.connect(self.store.path) as db:
            db.execute('update tasks set status=? where id=?', ('running', task))
        self.assertEqual(run(self.store, task)['status'], 'blocked')

    def test_timeout_blocks_operator(self):
        config = self.config(builder='import time; time.sleep(20)')
        config['timeout_seconds'] = 0.1
        result = run(self.store, self.create(config))
        self.assertEqual(result['status'], 'blocked')
        self.assertIn('timeout', result['events'][-1]['detail'])

    def test_prompt_and_context_include_scope_and_previous_output(self):
        code = 'import os,sys; p=sys.stdin.read(); assert "port 8000" in p; assert "Get a downloadable MP4" in p; assert os.environ["ETHINX_PRODUCT"]=="facelessforge"; print("evidence")'
        result = run(self.store, self.create(self.config(investigator=code)))
        self.assertEqual(result['status'], 'complete')
        self.assertIn('evidence', result['events'][1]['detail'])

    def test_rejects_bad_configuration_and_product(self):
        for config in ({'roles': {}}, self.config() | {'max_attempts': 0}):
            with self.assertRaises(ValueError):
                self.create(config)
        with self.assertRaises(ValueError):
            self.create(product='mixed')
        for config in ([], None, {'roles': None}, {'roles': []}):
            with self.subTest(config=config), self.assertRaises(ValueError):
                validate(config)

    def test_does_not_reexecute_complete_task(self):
        task = self.create()
        run(self.store, task)
        count = len(self.store.status(task)['events'])
        self.assertEqual(len(run(self.store, task)['events']), count)

    def test_redacts_environment_credentials(self):
        os.environ['TEST_API_KEY'] = 'secret-value-never-log'
        self.addCleanup(os.environ.pop, 'TEST_API_KEY', None)
        result = run(self.store, self.create(self.config(builder='import os; print(os.environ["TEST_API_KEY"])')))
        self.assertNotIn('secret-value-never-log', json.dumps(result))
        self.assertIn('[REDACTED]', json.dumps(result))

    def test_concurrent_runner_lock(self):
        import fcntl
        task = self.create()
        with open(str(self.store.path) + '.lock', 'a') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            with self.assertRaises(RuntimeError):
                run(self.store, task)

    def test_sigterm_stops_adapter_process_group(self):
        import signal
        import subprocess
        import time
        pid_file = self.root / 'adapter.pid'
        code = 'import os,time; from pathlib import Path; Path("adapter.pid").write_text(str(os.getpid())); time.sleep(20)'
        task = self.create(self.config(investigator=code))
        runner = Path(__file__).resolve().parents[1] / 'runner.py'
        parent = subprocess.Popen([sys.executable, str(runner), '--db', str(self.store.path), 'run', task], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            deadline = time.monotonic() + 3
            while not pid_file.exists() and time.monotonic() < deadline:
                time.sleep(0.01)
            self.assertTrue(pid_file.exists())
            child = int(pid_file.read_text())
            parent.send_signal(signal.SIGTERM)
            parent.wait(timeout=3)
            with self.assertRaises(ProcessLookupError):
                os.kill(child, 0)
        finally:
            if parent.poll() is None:
                parent.kill()
                parent.wait()
            if pid_file.exists():
                try:
                    os.kill(int(pid_file.read_text()), signal.SIGKILL)
                except ProcessLookupError:
                    pass


if __name__ == '__main__':
    unittest.main()
