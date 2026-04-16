const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/stream') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        const stream = fs.createReadStream('bigfile.txt');
        stream.pipe(res);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Go to /stream');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});