const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});