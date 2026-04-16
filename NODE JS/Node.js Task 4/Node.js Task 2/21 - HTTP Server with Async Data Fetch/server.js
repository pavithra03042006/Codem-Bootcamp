const http = require("http");

function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Arun", "Priya", "Kiran"]);
    }, 400);
  });
}

function getOrders() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([101, 102, 103, 104]);
    }, 500);
  });
}

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/summary") {

    Promise.all([getUsers(), getOrders()])
      .then(([users, orders]) => {
        const result = {
          users: users,
          orders: orders,
          totalUsers: users.length,
          totalOrders: orders.length
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result, null, 2));
      })
      .catch(() => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server error" }));
      });

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }

});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});