const express = require("express");
const app = express();

app.use(express.json());

let orders = [
  { id: 5001, product: "Laptop", quantity: 1 },
  { id: 5002, product: "Mobile", quantity: 2 },
  { id: 5003, product: "Headphones", quantity: 3 }
];

app.get("/orders", (req, res) => {
  console.log("Get all orders");
  res.status(200).json(orders);
});

app.post("/orders", (req, res) => {
  const { id, product, quantity } = req.body;

  if (!id || !product || !quantity) {
    console.log("Invalid order data");
    return res.status(400).json({
      message: "Id, product and quantity are required"
    });
  }

  orders.push({ id, product, quantity });
  console.log("Order created");

  res.status(201).json({
    message: "Order created successfully",
    order: { id, product, quantity }
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});