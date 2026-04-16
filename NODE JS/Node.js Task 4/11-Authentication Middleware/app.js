const express = require("express");
const app = express();

const VALID_TOKEN = "12345";

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  console.log("Auth Attempt:", token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access"
    });
  }

  if (token !== VALID_TOKEN) {
    return res.status(403).json({
      message: "Invalid token"
    });
  }

  next();
}

app.get("/", (req, res) => {
  res.status(200).send("Public Home Page");
});

app.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to Dashboard"
  });
});

app.listen(3000);