const http = require("http");

let activeRequests = 0;
const maxActive = 2;
const queue = [];
let requestId = 0;

function processRequest(id, res) {
  activeRequests++;
  const start = Date.now();

  console.log(`Request ${id}: processing`);

  setTimeout(() => {
    const timeTaken = Date.now() - start;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Request ${id} completed`);
    console.log(`Request ${id}: done in ${timeTaken}ms`);

    activeRequests--;

    if (queue.length > 0) {
      const next = queue.shift();
      next();
    }
  }, 1000);
}

const server = http.createServer((req, res) => {
  requestId++;
  const id = requestId;

  if (activeRequests < maxActive) {
    processRequest(id, res);
  } else {
    console.log(`Request ${id}: queued (waiting)`);
    queue.push(() => processRequest(id, res));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});