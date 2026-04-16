const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});