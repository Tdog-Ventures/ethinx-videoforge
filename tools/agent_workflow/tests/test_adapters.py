import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


class AdapterTests(unittest.TestCase):
    def test_large_prompt_uses_attachment(self):
        adapter = Path(__file__).resolve().parents[1] / 'opencode_adapter.py'
        with tempfile.TemporaryDirectory() as folder:
            fake = Path(folder) / 'opencode'
            fake.write_text('#!/usr/bin/env python3\nimport sys\nfrom pathlib import Path\np=Path(sys.argv[sys.argv.index("--file")+1]); print(len(p.read_text()))\n')
            fake.chmod(0o755)
            result = subprocess.run([sys.executable, str(adapter), '--agent', 'plan'],
                                    input='x' * 180000, text=True, capture_output=True,
                                    env=os.environ | {'PATH': folder + ':' + os.environ['PATH']})
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(result.stdout.strip(), '180000')

    def test_opencode_receives_prompt_as_attachment_without_shell(self):
        adapter = Path(__file__).resolve().parents[1] / 'opencode_adapter.py'
        with tempfile.TemporaryDirectory() as folder:
            fake = Path(folder) / 'opencode'
            fake.write_text('#!/usr/bin/env python3\nimport sys,json\nfrom pathlib import Path\np=Path(sys.argv[sys.argv.index("--file")+1]); print(json.dumps({"argv":sys.argv[1:],"prompt":p.read_text()}))\n')
            fake.chmod(0o755)
            result = subprocess.run([sys.executable, str(adapter), '--agent', 'plan'],
                                    input='Inspect $(touch unexpected)\nquoted "text"', text=True, capture_output=True,
                                    env=os.environ | {'PATH': folder + ':' + os.environ['PATH']})
            self.assertEqual(result.returncode, 0, result.stderr)
            import json
            data = json.loads(result.stdout)
            argv = data['argv']
            self.assertEqual(argv[:3], ['run', '--agent', 'plan'])
            self.assertEqual(data['prompt'], 'Inspect $(touch unexpected)\nquoted "text"')
            self.assertFalse(Path(argv[-1]).exists())

    def test_operator_defaults_to_blocked(self):
        adapter = Path(__file__).resolve().parents[1] / 'operator_gate.py'
        result = subprocess.run([sys.executable, str(adapter)], capture_output=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn(b'deployment', result.stderr)


if __name__ == '__main__':
    unittest.main()
