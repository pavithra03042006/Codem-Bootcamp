const http = require("http");

let jobs = [];
let jobId = 1;

function updateJobStatus(job) {
  // queued -> running
  setTimeout(() => {
    job.status = "running";

    // running -> done
    setTimeout(() => {
      job.status = "done";
    }, Math.floor(Math.random() * 4000) + 1000);

  }, Math.floor(Math.random() * 4000) + 1000);
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // POST /jobs
  if (method === "POST" && url === "/jobs") {
    const job = {
      id: jobId++,
      type: "default",
      status: "queued"
    };

    jobs.push(job);
    updateJobStatus(job);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(job));
  }

  // GET /jobs
  else if (method === "GET" && url === "/jobs") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(jobs));
  }

  // GET /jobs/:id
  else if (method === "GET" && url.startsWith("/jobs/")) {
    const id = parseInt(url.split("/")[2]);
    const job = jobs.find(j => j.id === id);

    if (job) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(job));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Job not found" }));
    }
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});