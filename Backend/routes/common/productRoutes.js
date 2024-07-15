const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  searchProducts,
} = require("../../controller/common/product/productController.js");

// Public routes
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
module.exports = router;

// 3. Query Parameters
// You can search products using various query parameters:

// name: Partial match for product names (case-insensitive).
// brand: Partial match for brands (case-insensitive).
// category: Filter by category ID.
// subcategory: Filter by subcategory ID.
// minPrice and maxPrice: Filter by price range.
// inStock: Filter to show only products in stock.
// sortBy: Sort results (e.g., price:asc or price:desc).

// 4. Testing the Endpoint
// After setting up the controller and routes, you can test the endpoint using tools like Postman or CURL. For example:

// To search for products with the name containing "laptop":


// GET /api/products/search?name=laptop
// To search for products within a price range of $100 to $500:


// GET /api/products/search?minPrice=100&maxPrice=500
// To search for products sorted by price in descending order:

// GET /api/products/search?sortBy=price:desc
