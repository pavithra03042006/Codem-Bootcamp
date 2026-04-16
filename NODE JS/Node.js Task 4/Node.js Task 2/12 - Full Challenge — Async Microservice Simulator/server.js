const http = require("http");

function authService(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "secret123") {
        resolve({ userId: 1 });
      } else {
        reject("Unauthorized");
      }
    }, 300);
  });
}

function userService(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Arun",
        email: "arun@mail.com",
        plan: "pro"
      });
    }, 500);
  });
}

function billingService(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        due: 1200,
        nextDate: "2024-02-01"
      });
    }, 400);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/profile") {
    const token = req.headers["x-auth"];

    authService(token)
      .then((authResult) => {
        return Promise.all([
          userService(authResult.userId),
          billingService(authResult.userId)
        ]);
      })
      .then(([user, billing]) => {
        const result = { user, billing };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result, null, 2));
      })
      .catch((err) => {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Unauthorized" }, null, 2));
      });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});