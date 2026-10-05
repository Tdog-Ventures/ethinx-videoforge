"""Default operator adapter: no deployment occurs without a real release command."""
import sys

print('No deployment adapter configured. MP4 evidence may be verified, but deployment is blocked. '
      'Replace the operator argv in your local template with a tested release-and-health command.', file=sys.stderr)
sys.exit(2)
