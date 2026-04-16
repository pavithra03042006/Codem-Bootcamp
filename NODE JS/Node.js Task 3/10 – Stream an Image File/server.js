const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === "/image") {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });

        const stream = fs.createReadStream("image.jpg");
        stream.pipe(res);
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});