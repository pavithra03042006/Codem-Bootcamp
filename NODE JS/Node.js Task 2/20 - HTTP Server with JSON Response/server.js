const http = require("http");

const server = http.createServer((req, res) => {

  // GET /users
  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      users: ["Arun", "Priya", "Kiran"]
    }));
  }

  // GET /products
  else if (req.method === "GET" && req.url === "/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      products: ["Laptop", "Phone", "Tablet"]
    }));
  }

  // Any other route
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      error: "Not found"
    }));
  }

});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});