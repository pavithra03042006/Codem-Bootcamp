const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "User routes working"
  });
});

router.get("/list", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Sai" },
    { id: 2, name: "Anu" },
    { id: 3, name: "Rahul" }
  ]);
});

module.exports = router;