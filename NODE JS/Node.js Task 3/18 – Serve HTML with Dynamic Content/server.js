const http = require('http');
const fs = require('fs').promises;
const url = require('url');

const server = http.createServer(async (req, res) => {

    const query = url.parse(req.url, true).query;
    const name = query.name || "Guest";

    let data = await fs.readFile("template.html", "utf-8");

    data = data.replace("{{username}}", name);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});