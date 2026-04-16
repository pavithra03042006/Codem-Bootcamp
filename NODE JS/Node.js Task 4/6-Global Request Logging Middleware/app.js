const express = require("express");
const app = express();

app.disable("etag");

app.use((req, res, next) => {
  const time = new Date().toLocaleString();

  res.on("finish", () => {
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${time}`);
  });

  next();
});

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(200).send("Home Page");
});

app.get("/api/products", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(200).json({ message: "Products List" });
});

app.get("/api/users", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(200).json({ message: "Users List" });
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(3000);