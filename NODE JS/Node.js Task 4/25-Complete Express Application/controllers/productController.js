let products = [
  { id: 101, name: "Laptop", price: 50000 },
  { id: 102, name: "Mobile", price: 20000 }
];

const getProducts = (req, res) => {
  console.log("Fetching products");
  res.status(200).json({
    success: true,
    data: products
  });
};

const createProduct = (req, res) => {
  const { id, name, price } = req.body;

  products.push({ id, name, price });
  console.log("Product created");

  res.status(201).json({
    success: true,
    message: "Product created successfully"
  });
};

module.exports = {
  getProducts,
  createProduct
};