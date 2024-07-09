const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../../controller/admin/category/categoryController");

const {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
} = require("../../controller/admin/subCategory/subCategory");
const router = express.Router();

// Routes for categories
router.post("/category", createCategory); // Create a new category
router.get("/category", getAllCategories); // Get all categories
router.get("/category/:id", getCategoryById); // Get category by ID
router.put("/category/:id", updateCategory); // Update category by ID
router.delete("/category/:id", deleteCategory); // Delete category by ID

// Routes for subcategories
router.post("/category/:categoryId/subcategory", createSubcategory); // Create a new subcategory under a category
router.get("/subcategory", getAllSubcategories); // Get all subcategories
router.get("/subcategory/:id", getSubcategoryById); // Get subcategory by ID
router.put("/subcategory/:id", updateSubcategory); // Update subcategory by ID
router.delete("/subcategory/:id", deleteSubcategory); // Delete subcategory by ID

module.exports = router;
