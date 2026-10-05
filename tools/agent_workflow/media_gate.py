"""Verify a downloadable MP4 with HTTP, ffprobe and full FFmpeg decoding."""
import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import subprocess
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import HTTPRedirectHandler, build_opener
import uuid


def check_url(url, host):
    parsed = urlsplit(url)
    if parsed.scheme not in ('http', 'https') or parsed.hostname != host or parsed.username or parsed.password or parsed.port == 8000:
        raise ValueError('download URL must use the allowed host, HTTP(S), no credentials, and no port 8000')


class Redirects(HTTPRedirectHandler):
    def __init__(self, host):
        self.host = host

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        check_url(newurl, self.host)
        if urlsplit(req.full_url).scheme == 'https' and urlsplit(newurl).scheme != 'https':
            raise ValueError('HTTPS downgrade redirect rejected')
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def command(argv, timeout=120):
    try:
        result = subprocess.run(argv, capture_output=True, timeout=timeout)
    except (OSError, subprocess.TimeoutExpired) as error:
        raise ValueError(f'media command failed: {error}') from error
    if result.returncode:
        raise ValueError(result.stderr.decode(errors='replace'))
    return result


def verify(url, host, output_dir, width, height, duration, tolerance=0.5, max_bytes=500_000_000, download_timeout=120):
    check_url(url, host)
    if (type(width) is not int or type(height) is not int or min(width, height) <= 0
            or not math.isfinite(duration) or duration <= 0 or not math.isfinite(tolerance) or tolerance < 0):
        raise ValueError('positive dimensions and duration, finite nonnegative tolerance required')
    output = Path(output_dir).resolve() / str(uuid.uuid4())
    output.mkdir(parents=True, mode=0o700)
    artifact = output / 'download.mp4'
    evidence = {'passed': False, 'artifact': str(artifact), 'allowed_host': host}
    try:
        started = time.monotonic()
        digest = hashlib.sha256()
        count = 0
        with build_opener(Redirects(host)).open(url, timeout=30) as response, artifact.open('wb') as target:
            check_url(response.url, host)
            evidence['http_status'] = response.status
            if response.status != 200:
                raise ValueError(f'final HTTP status must be 200, received {response.status}')
            while True:
                if response.fp is None:
                    break
                remaining = download_timeout - (time.monotonic() - started)
                if remaining <= 0:
                    raise ValueError('download deadline exceeded')
                # read1 returns after a socket read rather than waiting to fill
                # 64 KiB. Bound each read by the remaining overall deadline.
                response.fp.raw._sock.settimeout(min(30, remaining))
                chunk = response.read1(65536)
                if not chunk:
                    break
                count += len(chunk)
                if count > max_bytes:
                    raise ValueError('download exceeds size limit')
                target.write(chunk)
                digest.update(chunk)
        if not count:
            raise ValueError('empty download')
        evidence.update(size_bytes=count, sha256=digest.hexdigest())
        probe = command(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(artifact)])
        metadata = json.loads(probe.stdout)
        evidence['probe'] = metadata
        streams = metadata.get('streams', [])
        videos = [s for s in streams if s.get('codec_type') == 'video']
        audios = [s for s in streams if s.get('codec_type') == 'audio']
        if not videos or not audios:
            raise ValueError('video and audio streams are both required')
        if any(s.get('codec_type') not in ('video', 'audio') for s in streams):
            raise ValueError('unexpected non-audio/video stream')
        major_brand = metadata.get('format', {}).get('tags', {}).get('major_brand', '')
        if major_brand not in {'isom', 'iso2', 'iso3', 'iso4', 'iso5', 'iso6', 'mp41', 'mp42', 'avc1', 'dash'}:
            raise ValueError('MP4 container required')
        if any(s.get('width') != width or s.get('height') != height for s in videos):
            raise ValueError('video dimensions do not match acceptance criteria')
        lengths = [float(metadata.get('format', {}).get('duration', 'nan'))]
        lengths.extend(float(s.get('duration', 'nan')) for s in streams)
        if any(not math.isfinite(length) or abs(length - duration) > tolerance for length in lengths):
            raise ValueError('container or stream duration does not match acceptance criteria')
        argv = ['ffmpeg', '-hide_banner', '-v', 'error', '-xerror', '-i', str(artifact), '-map', '0', '-f', 'null', '-']
        evidence['decode_command'] = argv
        decode = command(argv)
        evidence['decode_stderr'] = decode.stderr.decode(errors='replace')
        evidence['passed'] = True
        return evidence
    except (HTTPError, URLError, OSError, ValueError, KeyError) as error:
        evidence['error'] = str(error)
        raise ValueError(f'media gate failed; evidence: {output / "evidence.json"}: {error}') from error
    finally:
        (output / 'evidence.json').write_text(json.dumps(evidence, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default=os.environ.get('ETHINX_MP4_URL'))
    parser.add_argument('--host', required=True)
    parser.add_argument('--output-dir', default='.agent-workflow/evidence')
    parser.add_argument('--width', type=int, required=True)
    parser.add_argument('--height', type=int, required=True)
    parser.add_argument('--duration', type=float, required=True)
    parser.add_argument('--tolerance', type=float, default=0.5)
    args = parser.parse_args()
    try:
        if not args.url:
            raise ValueError('provide --url or ETHINX_MP4_URL')
        result = verify(args.url, args.host, args.output_dir, args.width, args.height, args.duration, args.tolerance)
        print(json.dumps(result, indent=2))
    except ValueError as error:
        print(error, file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
