const express = require("express");
const app = express();

const products = [
  { id: 101, name: "Laptop", price: 50000 },
  { id: 102, name: "Mobile", price: 20000 },
  { id: 103, name: "Headphones", price: 2000 },
  { id: 104, name: "Keyboard", price: 1500 },
  { id: 105, name: "Mouse", price: 800 }
];

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const requestTime = new Date().toLocaleString();

  console.log("Requested Product ID:", req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({
      message: "Invalid product ID format",
      requestTime: requestTime
    });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      requestTime: requestTime
    });
  }

  res.status(200).json({
    ...product,
    requestTime: requestTime
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});