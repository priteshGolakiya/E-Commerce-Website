const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../../controller/common/product/productController.js");

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
