const express = require("express");
const app = express();

const productRoutes = require("./routes/products");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Home route working"
  });
});

app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});