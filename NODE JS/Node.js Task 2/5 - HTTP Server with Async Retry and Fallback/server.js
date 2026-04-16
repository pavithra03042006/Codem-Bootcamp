const http = require("http");

function unstableDB() {
  return new Promise((resolve, reject) => {
    // 70% chance fail
    if (Math.random() < 0.7) {
      reject("Database failed");
    } else {
      resolve(["Apple", "Banana", "Orange"]);
    }
  });
}

function fallbackData() {
  return ["Cached Item 1", "Cached Item 2", "Cached Item 3"];
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDataWithRetry() {
  const delays = [500, 1000, 2000];

  for (let i = 0; i < 3; i++) {
    try {
      const data = await unstableDB();
      return { source: "database", data };
    } catch (error) {
      if (i < 2) {
        console.log(`Attempt ${i + 1} failed — retrying in ${delays[i]}ms`);
        await wait(delays[i]);
      } else {
        console.log(`Attempt 3 failed — using fallback`);
        return { source: "cache", data: fallbackData() };
      }
    }
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/data" && req.method === "GET") {
    const result = await getDataWithRetry();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result, null, 2));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});