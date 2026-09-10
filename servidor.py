#!/usr/bin/env python3
"""
Servidor local para la aplicación de Análisis Zoosanitario.
Permite servir la web en http://localhost:8080 y ofrece endpoints API
para sincronizar directamente en vivo con el Servicio REST del Ayuntamiento de Sevilla.
"""
import http.server
import socketserver
import json
import os
import urllib.parse
from descargar_datos import procesar_todos

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Habilitar CORS para peticiones locales
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        if parsed.path == '/api/sincronizar':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            try:
                animales = procesar_todos()
                response_data = {
                    "ok": True,
                    "mensaje": "Sincronización completada con éxito",
                    "total": len(animales),
                    "datos": animales
                }
                self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                err_data = {"ok": False, "error": str(e)}
                self.wfile.write(json.dumps(err_data).encode('utf-8'))
            return
            
        elif parsed.path == '/api/datos':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            json_file = os.path.join(DIRECTORY, "datos_ayuntamiento.json")
            if os.path.exists(json_file):
                with open(json_file, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b"[]")
            return

        super().do_GET()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"============================================================")
        print(f" Servidor Zoosanitario Sevilla iniciado:")
        print(f" -> Abre en tu navegador: http://localhost:{PORT}")
        print(f" -> Endpoint API REST:   http://localhost:{PORT}/api/sincronizar")
        print(f"============================================================")
        httpd.serve_forever()

if __name__ == '__main__':
    run_server()
