const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const API_BASE = 'https://voice.educ-ai.fr';
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Enable CORS for local dev flexibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API Proxying ---
  if (pathname.startsWith('/api/')) {
    const targetPath = pathname.replace(/^\/api/, '');
    const upstreamUrl = `${API_BASE}${targetPath}${parsedUrl.search || ''}`;

    const upstreamReqOptions = {
      method: req.method,
      headers: {
        'Accept': req.headers['accept'] || '*/*',
        'User-Agent': 'VoiceEducAI-WebUI/1.0'
      }
    };

    if (req.headers['content-type']) {
      upstreamReqOptions.headers['content-type'] = req.headers['content-type'];
    }

    const upstreamReq = https.request(upstreamUrl, upstreamReqOptions, (upstreamRes) => {
      // Forward status and headers
      const headers = { ...upstreamRes.headers };
      delete headers['access-control-allow-origin'];
      delete headers['access-control-allow-methods'];
      headers['access-control-allow-origin'] = '*';

      // Specific handling for forced download endpoint
      if (pathname.startsWith('/api/download/')) {
        const genId = pathname.split('/api/download/')[1] || 'audio';
        headers['content-disposition'] = `attachment; filename="voix-educai-${genId.slice(0, 8)}.wav"`;
        headers['content-type'] = 'audio/wav';
      }

      res.writeHead(upstreamRes.statusCode, headers);
      upstreamRes.pipe(res);
    });

    upstreamReq.on('error', (err) => {
      console.error('API Proxy Error:', err);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Proxy request failed', details: err.message }));
    });

    // Pipe request body if POST/PUT
    req.pipe(upstreamReq);
    return;
  }

  // --- Static Files Serving ---
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  
  // Security check: ensure path is inside PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA if not found
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🎤 Voice Educ-AI Web Studio démarré avec succès !`);
  console.log(`🔗 Accédez à l'interface : http://localhost:${PORT}`);
  console.log(`📡 Relais API connecté à : ${API_BASE}`);
  console.log(`=================================================\n`);
});
