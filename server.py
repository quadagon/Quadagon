import http.server
import socketserver
import os

PORT = 8080

class QuadagonHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for smooth asset loading
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

Handler = QuadagonHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 Quadagon Server running smoothly at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
