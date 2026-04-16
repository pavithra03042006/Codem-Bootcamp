const http = require("http");

let count = 0;
let startTime = Date.now();

http.createServer((req, res) => {

  if (req.url === "/secure" && req.method === "GET") {

    let time = new Date().toTimeString().split(" ")[0];
    console.log(`[${time}] GET /secure`);

    if (req.headers["x-auth"] !== "secret123") {
      res.writeHead(401);
      return res.end("401 Unauthorized");
    }
    console.log("Auth passed");

    if (Date.now() - startTime > 60000) {
      count = 0;
      startTime = Date.now();
    }

    count++;

    if (count > 5) {
      res.writeHead(429);
      return res.end("429 Too Many Requests");
    }

    console.log(`Rate limit: ${count}/5`);

    res.end("Response sent");
    console.log("Response sent");

  } else {
    res.writeHead(404);
    res.end("Not Found");
  }

}).listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});