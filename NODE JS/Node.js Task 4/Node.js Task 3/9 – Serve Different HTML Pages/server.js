const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        fs.readFile("home.html", (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    else if (req.url === "/about") {
        fs.readFile("about.html", (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    else if (req.url === "/contact") {
        fs.readFile("contact.html", (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});