const express = require("express");
const app = express();

app.use(express.json());

let products = [
  { id: 101, name: "Laptop", price: 50000 },
  { id: 102, name: "Mobile", price: 20000 },
  { id: 103, name: "Headphones", price: 3000 }
];

app.get("/products", (req, res) => {
  console.log("Get all products");
  res.status(200).json(products);
});

app.post("/products", (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({
      message: "Id, name and price are required"
    });
  }

  const existingProduct = products.find(product => product.id === id);

  if (existingProduct) {
    return res.status(400).json({
      message: "Product id must be unique"
    });
  }

  products.push({ id, name, price });
  console.log("Product created");

  res.status(201).json({
    message: "Product created successfully"
  });
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Name and price are required"
    });
  }

  const product = products.find(product => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  product.name = name;
  product.price = price;

  console.log("Product updated");

  res.status(200).json({
    message: "Product updated successfully"
  });
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products.splice(index, 1);
  console.log("Product deleted");

  res.status(200).json({
    message: "Product deleted successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});