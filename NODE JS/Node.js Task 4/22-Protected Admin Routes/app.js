const express = require("express");
const app = express();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  console.log("Admin route access:", token);

  if (!token || token !== "admin123") {
    return res.status(401).json({
      message: "Unauthorized access"
    });
  }

  next();
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Public route working"
  });
});

app.get("/admin", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome Admin"
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});