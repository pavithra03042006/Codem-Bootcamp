const express = require("express");
const app = express();

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
  { id: 6, name: "Item 6" },
  { id: 7, name: "Item 7" },
  { id: 8, name: "Item 8" },
  { id: 9, name: "Item 9" },
  { id: 10, name: "Item 10" },
  { id: 11, name: "Item 11" },
  { id: 12, name: "Item 12" },
  { id: 13, name: "Item 13" },
  { id: 14, name: "Item 14" },
  { id: 15, name: "Item 15" },
  { id: 16, name: "Item 16" },
  { id: 17, name: "Item 17" },
  { id: 18, name: "Item 18" },
  { id: 19, name: "Item 19" },
  { id: 20, name: "Item 20" }
];

app.get("/items", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  console.log(`Page: ${page}, Limit: ${limit}`);

  if (page < 1 || limit < 1) {
    return res.status(400).json({
      message: "Invalid page or limit"
    });
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedItems = items.slice(start, end);

  res.status(200).json({
    page: page,
    limit: limit,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / limit),
    items: paginatedItems
  });
});

app.listen(3000);