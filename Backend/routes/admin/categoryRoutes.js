const express = require("express");
const {
  createCategory,
  createSubcategory,
} = require("../../controller/admin/categoryController");
const router = express.Router();

// Route for creating a new category
router.post("/category", createCategory);

// Route for creating a new subcategory under a category
router.post("/subcategory", createSubcategory);

module.exports = router;
