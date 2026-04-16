const express = require("express");
const app = express();

const products = [
  { id: 1, name: "Laptop", category: "electronics" },
  { id: 2, name: "Mobile", category: "electronics" },
  { id: 3, name: "Shirt", category: "clothing" },
  { id: 4, name: "Shoes", category: "clothing" },
  { id: 5, name: "Headphones", category: "electronics" }
];

app.get("/search", (req, res) => {
  const { name, category } = req.query;

  console.log("Search Query:", req.query);

  let result = products;

  if (name) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (!name && !category) {
    return res.status(400).json({
      message: "No query provided"
    });
  }

  res.status(200).json({
    resultCount: result.length,
    products: result
  });
});

app.listen(3000);