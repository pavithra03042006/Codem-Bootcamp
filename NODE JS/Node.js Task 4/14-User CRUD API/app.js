const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Sai", email: "sai@mail.com" },
  { id: 2, name: "Anu", email: "anu@mail.com" },
  { id: 3, name: "Rahul", email: "rahul@mail.com" }
];

app.get("/users", (req, res) => {
  console.log("Get all users");
  res.status(200).json(users);
});

app.post("/users", (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({
      message: "Id, name and email are required"
    });
  }

  users.push({ id, name, email });
  console.log("User created");
  res.status(201).json({
    message: "User created successfully"
  });
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  user.name = name;
  user.email = email;

  console.log("User updated");
  res.status(200).json({
    message: "User updated successfully"
  });
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users.splice(index, 1);

  console.log("User deleted");
  res.status(200).json({
    message: "User deleted successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});