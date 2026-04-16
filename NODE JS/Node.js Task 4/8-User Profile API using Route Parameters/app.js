const express = require("express");
const app = express();

const users = [
  { username: "sai", email: "sai@mail.com", role: "student" },
  { username: "anu", email: "anu@mail.com", role: "admin" },
  { username: "rahul", email: "rahul@mail.com", role: "student" },
  { username: "meena", email: "meena@mail.com", role: "staff" },
  { username: "kavin", email: "kavin@mail.com", role: "student" }
];

app.get("/users/:username", (req, res) => {
  const uname = req.params.username.toLowerCase();
  const time = new Date().toLocaleString();

  console.log("Requested Username:", req.params.username);

  const user = users.find(u => u.username === uname);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      requestTime: time
    });
  }

  res.status(200).json({
    ...user,
    requestTime: time
  });
});

app.listen(3000);