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
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Category not found",
      });
    }

    const subcategories = await Subcategory.find({ category: id });

    const subcategoryIds = subcategories.map((sub) => sub._id);

    const products = await Product.find({
      subcategory: { $in: subcategoryIds },
    }).select("name images subcategory");

    const formattedCategory = {
      _id: category._id,
      name: category.name,
      subcategories: subcategories.map((subcategory) => ({
        _id: subcategory._id,
        name: subcategory.name,
        products: products
          .filter(
            (product) =>
              product.subcategory.toString() === subcategory._id.toString()
          )
          .map((product) => ({
            _id: product._id,
            name: product.name,
            image: product.images.length > 0 ? product.images[0] : null,
          })),
      })),
    };

    res.status(200).json({
      error: false,
      success: true,
      category: formattedCategory,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: true,
      success: false,
      message: err.message,
    });
  }
});
module.exports = {
  getAllCategories,
  getCategoryById,
};
