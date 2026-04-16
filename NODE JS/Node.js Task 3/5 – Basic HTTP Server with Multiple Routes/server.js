const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.end('Welcome to my Node Server');
    }
    else if (req.url === '/about') {
        res.end('This server is built using Node.js');
    }
    else if (req.url === '/contact') {
        res.end('Contact: example@gmail.com');
    }
    else {
        res.end('Page Not Found');
    }

});

server.listen(3000);