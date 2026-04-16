const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const userRoutes = require("./routes/userRoutes");

app.use(logger);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Application running successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});