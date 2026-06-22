#!/bin/sh
PORT=${1:-8080}
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)
echo "Serving at http://localhost:$PORT"
[ -n "$LOCAL_IP" ] && echo "         http://$LOCAL_IP:$PORT  (WiFi)"
python3 -m http.server "$PORT"
