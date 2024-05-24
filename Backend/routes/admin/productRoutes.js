const express = require("express");
const router = express.Router();
const productController = require("../../controller/admin/product/productController");

// Public routes
router.get("/product/", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);

// Admin routes
router.post("/product/", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;
