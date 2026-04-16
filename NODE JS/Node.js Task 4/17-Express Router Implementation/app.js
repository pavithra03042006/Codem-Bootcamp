const express = require("express");
const app = express();

const userRoutes = require("./routes/users");

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});