from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import sys
import tempfile
import threading
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from media_gate import verify, check_url


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        if self.path == '/slow':
            import time
            self.send_response(200)
            self.end_headers()
            try:
                for _ in range(40):
                    self.wfile.write(b'x')
                    self.wfile.flush()
                    time.sleep(0.03)
            except (BrokenPipeError, ConnectionResetError):
                pass
        elif self.path == '/redirect':
            self.send_response(302)
            self.send_header('Location', 'http://not-allowed.example/video.mp4')
            self.end_headers()
        elif self.path == '/partial':
            self.send_response(206)
            self.end_headers()
            self.wfile.write(b'partial')
        else:
            super().do_GET()


class MediaTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.root = Path(cls.temp.name)
        base = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', 'color=c=blue:s=160x240:r=10']
        subprocess.run(base + ['-f', 'lavfi', '-i', 'sine=frequency=440', '-t', '1', '-c:v', 'libx264', '-c:a', 'aac', '-shortest', str(cls.root / 'video.mp4')], check=True)
        subprocess.run(base + ['-t', '1', '-c:v', 'libx264', str(cls.root / 'silent.mp4')], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-i', str(cls.root / 'video.mp4'), '-c', 'copy', '-f', 'mov', str(cls.root / 'quicktime.mov')], check=True)
        (cls.root / 'corrupt.mp4').write_bytes(b'not a video')
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(cls.root)))
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.url = f'http://127.0.0.1:{cls.server.server_port}'

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
        cls.temp.cleanup()

    def gate(self, path='/video.mp4', **options):
        args = dict(width=160, height=240, duration=1, tolerance=0.2)
        args.update(options)
        return verify(self.url + path, '127.0.0.1', self.root / 'evidence', **args)

    def test_download_probe_and_complete_decode(self):
        result = self.gate()
        self.assertTrue(result['passed'])
        self.assertEqual(result['http_status'], 200)
        self.assertEqual(len(result['sha256']), 64)
        self.assertIn('-xerror', result['decode_command'])
        self.assertEqual(result['decode_command'][result['decode_command'].index('-map') + 1], '0')
        self.assertTrue(Path(result['artifact']).is_file())

    def test_non_200_is_rejected(self):
        for path in ('/missing', '/partial'):
            with self.subTest(path=path), self.assertRaises(ValueError):
                self.gate(path)

    def test_redirect_cannot_escape_allowed_host(self):
        with self.assertRaises(ValueError):
            self.gate('/redirect')

    def test_corrupt_media_rejected(self):
        with self.assertRaises(ValueError):
            self.gate('/corrupt.mp4')

    def test_wrong_dimensions_rejected(self):
        with self.assertRaises(ValueError):
            self.gate(width=240, height=160)

    def test_wrong_duration_rejected(self):
        with self.assertRaises(ValueError):
            self.gate(duration=10)

    def test_missing_audio_rejected(self):
        with self.assertRaises(ValueError):
            self.gate('/silent.mp4')

    def test_quicktime_mov_is_not_mp4(self):
        with self.assertRaises(ValueError):
            self.gate('/quicktime.mov')

    def test_forbidden_url_and_invalid_criteria(self):
        for url in ('http://127.0.0.1:8000/file', 'file:///tmp/video', 'https://user:pass@example.com/a'):
            with self.subTest(url=url), self.assertRaises(ValueError):
                check_url(url, '127.0.0.1')
        with self.assertRaises(ValueError):
            self.gate(duration=-1)

    def test_slow_drip_obeys_download_deadline(self):
        import time
        started = time.monotonic()
        with self.assertRaises(ValueError):
            self.gate('/slow', download_timeout=0.15)
        self.assertLess(time.monotonic() - started, 0.5)


if __name__ == '__main__':
    unittest.main()
