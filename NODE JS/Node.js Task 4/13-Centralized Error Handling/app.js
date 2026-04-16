const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Home Page" });
});

app.get("/error", (req, res, next) => {
  const err = new Error("Something went wrong");
  err.status = 500;
  next(err);
});

app.get("/users/:id", (req, res, next) => {
  const id = req.params.id;

  if (isNaN(id)) {
    const err = new Error("Invalid user id");
    err.status = 400;
    return next(err);
  }

  res.status(200).json({ message: "Valid user id", id: id });
});

app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("Error:", err.message);

  res.status(err.status || 500).json({
    error: err.message,
    statusCode: err.status || 500
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});