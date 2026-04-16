const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Products Router:", req.method, req.url);
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Products API working"
  });
});

module.exports = router;