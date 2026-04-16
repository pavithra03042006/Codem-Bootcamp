const express = require("express");
const app = express();

app.use(express.json());

function validateUser(req, res, next) {
  const body = req.body || {};
  const name = body.name;
  const email = body.email;

  if (!name || !email) {
    console.log("Validation Failed");
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  next();
}

app.post("/users", validateUser, (req, res) => {
  res.status(200).json({
    message: "User created",
    data: req.body
  });
});

app.post("/register", validateUser, (req, res) => {
  res.status(200).json({
    message: "Registered successfully",
    data: req.body
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});