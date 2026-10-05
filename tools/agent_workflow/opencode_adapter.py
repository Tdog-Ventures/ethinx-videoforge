"""Pass the coordinator's stdin prompt to OpenCode's noninteractive run CLI."""
import argparse
import os
from pathlib import Path
import subprocess
import sys
import tempfile


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--agent', choices=['plan', 'build'], required=True)
    args = parser.parse_args()
    prompt = sys.stdin.read()
    if not prompt.strip():
        print('coordinator prompt required', file=sys.stderr)
        return 2
    argv = ['opencode', 'run', '--agent', args.agent]
    model = os.environ.get('ETHINX_AGENT_MODEL')
    if model:
        argv.extend(['--model', model])
    try:
        with tempfile.TemporaryDirectory(prefix='ethinx-agent-context-') as directory:
            context = Path(directory) / 'task-context.txt'
            context.write_text(prompt)
            context.chmod(0o600)
            argv.extend(['Follow the role instructions and task context in the attached file.', '--file', str(context)])
            return subprocess.call(argv)
    except OSError as error:
        print(f'OpenCode unavailable: {error}', file=sys.stderr)
        return 127


if __name__ == '__main__':
    sys.exit(main())
