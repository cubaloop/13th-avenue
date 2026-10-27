import http.server
import socketserver
import os
import sys
import json
import base64
import threading
import time
import urllib.request

class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True

PORT = int(os.environ.get("PORT", 8000))
HOST = os.environ.get("HOST", "0.0.0.0")

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent caching for development convenience
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        if self.path in ('/healthz', '/api/config'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "ok",
                "service": "13th-avenue",
                "persistence": "supabase-dual-layer",
                "wakelock": "active-24-7"
            }).encode('utf-8'))
            return
        super().do_GET()

    def do_POST(self):
        # Handle API routes
        if self.path == '/api/save-products':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                products_list = json.loads(post_data.decode('utf-8'))
                data_str = json.dumps(products_list, indent=2)
                
                # Write back to products.js source file
                with open('products.js', 'w', encoding='utf-8') as f:
                    f.write(f"const products = {data_str};\n\nif (typeof module !== 'undefined' && module.exports) {{\n  module.exports = products;\n}}\n")
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Products database saved to products.js"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                
        elif self.path == '/api/save-content':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                content_obj = json.loads(post_data.decode('utf-8'))
                data_str = json.dumps(content_obj, indent=2)
                
                # Write back to content.js source file
                with open('content.js', 'w', encoding='utf-8') as f:
                    f.write(f"const siteContent = {data_str};\n\nif (typeof module !== 'undefined' && module.exports) {{\n  module.exports = siteContent;\n}}\n")
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Copy content saved to content.js"}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                
        elif self.path == '/api/upload-image':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                upload_data = json.loads(post_data.decode('utf-8'))
                filename = upload_data.get('filename')
                b64data = upload_data.get('base64')
                
                if not filename or not b64data:
                    raise ValueError("Missing filename or base64 data")
                    
                # Strip base64 prefix if present
                if ',' in b64data:
                    b64data = b64data.split(',')[1]
                    
                binary_data = base64.b64decode(b64data)
                
                # Ensure assets directory exists
                os.makedirs('assets', exist_ok=True)
                
                # Clean filename to prevent path traversal
                filename = os.path.basename(filename)
                filepath = os.path.join('assets', filename)
                
                with open(filepath, 'wb') as f:
                    f.write(binary_data)
                    
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success", 
                    "message": f"Image saved as assets/{filename}", 
                    "path": f"assets/{filename}"
                }).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def wake_lock_daemon():
    """Periodic 24/7 HTTP pulse every 5 minutes to prevent Render container sleep."""
    target_url = os.environ.get("RENDER_EXTERNAL_URL", f"http://127.0.0.1:{PORT}").rstrip("/") + "/healthz"
    while True:
        time.sleep(300)
        try:
            urllib.request.urlopen(target_url, timeout=10).read()
        except Exception:
            pass

def run_server():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(current_dir)
    
    # Start 24/7 Wake-Lock daemon thread
    daemon = threading.Thread(target=wake_lock_daemon, daemon=True)
    daemon.start()

    handler = CustomHTTPRequestHandler
    with ThreadingTCPServer((HOST, PORT), handler) as httpd:
        print("==================================================================")
        print(f"   13th Avenue web server is running on {HOST}:{PORT}!")
        print(f"   Healthcheck & Wake-Lock active at: http://localhost:{PORT}/healthz")
        print("==================================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down the server. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    run_server()

