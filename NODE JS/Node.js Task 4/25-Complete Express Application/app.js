const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running successfully"
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});