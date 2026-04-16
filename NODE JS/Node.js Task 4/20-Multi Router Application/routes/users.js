const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Users Router:", req.method, req.url);
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Users API working"
  });
});

module.exports = router;