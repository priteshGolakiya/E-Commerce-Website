const asyncHandler = require("express-async-handler");
const Category = require("../../../models/categoryModel");
const Subcategory = require("../../../models/subCategoryModel");
const Product = require("../../../models/productModel");

// Get all categories with subcategories and products
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory");
    res.status(200).json({ error: false, success: true, products });
  } catch (err) {
    res.status(500).json({ error: true, success: false, message: err.message });
  }
});

// Get category by ID with subcategories and products
const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "subcategories",
      populate: {
        path: "products",
        select: "name image",
      },
    });
    if (!category) {
      return res
        .status(404)
        .json({ error: true, success: false, message: "Category not found" });
    }
    res.status(200).json({ error: false, success: true, category });
  } catch (err) {
    res.status(500).json({ error: true, success: false, message: err.message });
  }
});

module.exports = {
  getAllCategories,
  getCategoryById,
};
