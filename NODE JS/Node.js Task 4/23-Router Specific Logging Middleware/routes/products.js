const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} /products${req.url} - ${res.statusCode}`);
  });
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Products route working"
  });
});

router.get("/list", (req, res) => {
  res.status(200).json([
    { id: 101, name: "Laptop", price: 50000 },
    { id: 102, name: "Mobile", price: 20000 },
    { id: 103, name: "Headphones", price: 3000 }
  ]);
});

module.exports = router;