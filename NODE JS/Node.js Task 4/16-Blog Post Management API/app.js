const express = require("express");
const app = express();

app.use(express.json());

let posts = [
  { id: 1, title: "Express Basics", content: "Introduction to Express", author: "Sai" },
  { id: 2, title: "Node JS", content: "Working with Node", author: "Anu" },
  { id: 3, title: "API Testing", content: "Using Postman for testing", author: "Rahul" }
];

app.get("/posts", (req, res) => {
  console.log("Get all posts");
  res.status(200).json(posts);
});

app.post("/posts", (req, res) => {
  const { id, title, content, author } = req.body;

  if (!id || !title || !content || !author) {
    return res.status(400).json({
      message: "Id, title, content and author are required"
    });
  }

  posts.push({ id, title, content, author });
  console.log("Post created");

  res.status(201).json({
    message: "Post created successfully"
  });
});

app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  if (!title || !content || !author) {
    return res.status(400).json({
      message: "Title, content and author are required"
    });
  }

  post.title = title;
  post.content = content;
  post.author = author;

  console.log("Post updated");

  res.status(200).json({
    message: "Post updated successfully"
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  posts.splice(index, 1);
  console.log("Post deleted");

  res.status(200).json({
    message: "Post deleted successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});