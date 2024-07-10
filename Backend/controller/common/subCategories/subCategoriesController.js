const asyncHandler = require("express-async-handler");
const Category = require("../../../models/categoryModel");
const Subcategory = require("../../../models/subCategoryModel");
const Product = require("../../../models/productModel");

// Get all subcategories
const getAllSubcategories = asyncHandler(async (req, res) => {
  try {
    // Fetch all subcategories and populate their 'category' field
    const subcategories = await Subcategory.find().populate("category");

    // Prepare an array to store subcategories with products and images
    const subcategoriesWithProducts = [];

    // Loop through each subcategory to fetch related products and format the response
    for (let i = 0; i < subcategories.length; i++) {
      const subcategory = subcategories[i];

      // Fetch products related to this subcategory
      const products = await Product.find({ subcategory: subcategory._id });

      // Map products to include only necessary details (like name, price, images)
      const productsMapped = products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images.slice(0, 3), // Adjust number of images as needed
      }));

      // Create an object with subcategory details and related products
      const subcategoryWithProducts = {
        _id: subcategory._id,
        name: subcategory.name,
        category: subcategory.category,
        products: productsMapped,
      };

      // Push the formatted subcategory object to the array
      subcategoriesWithProducts.push(subcategoryWithProducts);
    }

    // Return the array of subcategories with related products and images
    res.status(200).json({
      error: false,
      success: true,
      subcategories: subcategoriesWithProducts,
    });
  } catch (err) {
    // Handle any errors that occur during the query or population
    res.status(500).json({ error: true, success: false, error: err.message });
  }
});

// Get subcategory by ID
const getSubcategoryById = asyncHandler(async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    // Fetch the subcategory and populate its 'category' field
    const subcategory = await Subcategory.findById(subcategoryId).populate(
      "category"
    );

    if (!subcategory) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Subcategory not found",
      });
    }

    // Fetch products related to this subcategory
    const products = await Product.find({ subcategory: subcategoryId });

    // Map products to include only necessary details (like name, price, images)
    const productsMapped = products.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images.slice(0, 3), // Adjust number of images as needed
    }));

    res.status(200).json({
      error: false,
      success: true,
      subcategory,
      products: productsMapped,
    });
  } catch (err) {
    res.status(500).json({ error: true, success: false, error: err.message });
  }
});

module.exports = {
  getAllSubcategories,
  getSubcategoryById,
};
