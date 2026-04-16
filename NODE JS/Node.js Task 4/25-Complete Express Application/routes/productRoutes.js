const express = require("express");
const router = express.Router();
const validateProduct = require("../middleware/validate").validateProduct;
const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.post("/", validateProduct, productController.createProduct);

module.exports = router;