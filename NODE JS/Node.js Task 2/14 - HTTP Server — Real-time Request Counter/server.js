const http = require("http");

let totalRequests = 0;
let successCount = 0;
let errorCount = 0;
let totalResponseTime = 0;

function sendResponse(res, statusCode, data, startTime) {
  const timeTaken = Date.now() - startTime;
  totalResponseTime += timeTaken;

  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const startTime = Date.now();
  totalRequests++;

  if (req.method === "GET" && req.url === "/hello") {
    const delay = Math.floor(Math.random() * 401) + 100;

    setTimeout(() => {
      successCount++;
      sendResponse(
        res,
        200,
        { message: "Hello World" },
        startTime
      );
    }, delay);
  }

  else if (req.method === "GET" && req.url === "/fail") {
    errorCount++;
    sendResponse(
      res,
      500,
      { message: "Internal Server Error" },
      startTime
    );
  }

  else if (req.method === "GET" && req.url === "/stats") {
    const avg =
      totalRequests > 0 ? Math.floor(totalResponseTime / totalRequests) : 0;

    sendResponse(
      res,
      200,
      {
        totalRequests: totalRequests,
        successCount: successCount,
        errorCount: errorCount,
        avgResponseTime: `${avg}ms`
      },
      startTime
    );
  }

  else {
    errorCount++;
    sendResponse(
      res,
      404,
      { message: "Not Found" },
      startTime
    );
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});