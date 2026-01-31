const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SRC_DIR = path.join(__dirname, 'src');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
};

const server = http.createServer((req, res) => {
    let filePath = path.join(SRC_DIR, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 - File Not Found');
            } else {
                res.writeHead(500);
                res.end('500 - Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
    console.log(`📁 Serving files from: ${SRC_DIR}`);
    console.log('\nPress Ctrl+C to stop the server');
});
