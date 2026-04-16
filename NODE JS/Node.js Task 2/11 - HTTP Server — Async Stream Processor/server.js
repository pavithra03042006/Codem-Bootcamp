const http = require("http");

function parseJSON(data) {
  return new Promise((resolve, reject) => {
    try {
      const obj = JSON.parse(data);
      resolve(obj);
    } catch (err) {
      reject("Invalid JSON");
    }
  });
}

function validateSchema(obj) {
  return new Promise((resolve, reject) => {
    if (obj.name && obj.age && obj.email) {
      resolve(obj);
    } else {
      reject("Validation failed");
    }
  });
}

function transformData(obj) {
  return new Promise((resolve) => {
    obj.name = obj.name.toUpperCase();
    obj.email = "xyz@gmail.com";
    resolve(obj);
  });
}

function buildResponse(obj) {
  return new Promise((resolve) => {
    resolve({
      success: true,
      data: obj
    });
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/process") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      parseJSON(body)
        .then(validateSchema)
        .then(transformData)
        .then(buildResponse)
        .then(result => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result, null, 2));
        })
        .catch(err => {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: err }, null, 2));
        });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});