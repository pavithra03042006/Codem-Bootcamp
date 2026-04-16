const express = require("express");
const app = express();

const products = [
  { id: 101, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 102, name: "Phone", price: 20000, category: "Electronics" },
  { id: 103, name: "Shirt", price: 1500, category: "Clothing" },
  { id: 104, name: "Book", price: 500, category: "Education" },
  { id: 105, name: "Watch", price: 3000, category: "Accessories" }
];

app.use("/api/products", (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.get("/api/products", (req, res) => {
  const valid = products.every(p => typeof p.price === "number");

  if (!valid) {
    return res.status(500).json({ message: "Invalid product price" });
  }

  const sortedProducts = [...products].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  res.status(200).json({
    totalProducts: sortedProducts.length,
    products: sortedProducts
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});