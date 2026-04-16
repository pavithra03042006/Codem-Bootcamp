const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Public route working"
  });
});

app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});