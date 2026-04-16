const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === "/csv") {
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=data.csv'
        });

        const stream = fs.createReadStream('data.csv');
        stream.pipe(res);
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});