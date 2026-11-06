const http = require('http');
const https = require('https');

// Starts a secure proxy relay loop on port 8080
http.createServer((req, res) => {
  const options = {
    hostname: 'magma.com',
    port: 443,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'magma.com' }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxyReq);
}).listen(8080);

