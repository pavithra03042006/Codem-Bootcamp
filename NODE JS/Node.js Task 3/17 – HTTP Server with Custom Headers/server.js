const http = require('http');

const server = http.createServer((req, res) => {
    const start = Date.now();

    let message = "";

    if (req.method === "GET" && req.url === "/") {
        message = "Home Page";
    } else if (req.method === "GET" && req.url === "/api") {
        message = "API Route";
    } else {
        message = "Page Not Found";
    }

    const responseTime = Date.now() - start;

    res.setHeader("X-Powered-By", "Node.js");
    res.setHeader("X-Response-Time", responseTime + "ms");
    res.setHeader("Content-Type", "text/html");

    console.log("Response Headers Sent:");
    console.log("X-Powered-By: " + res.getHeader("X-Powered-By"));
    console.log("X-Response-Time: " + res.getHeader("X-Response-Time"));
    console.log("Content-Type: " + res.getHeader("Content-Type"));

    res.end(message);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});