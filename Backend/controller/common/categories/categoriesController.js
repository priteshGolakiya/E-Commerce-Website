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
    console.log("Fetching category with ID:", id);
    const category = await Category.findById(id);

    if (!category) {
      console.log("Category not found");
      return res.status(404).json({
        error: true,
        success: false,
        message: "Category not found",
      });
    }

    console.log("Category found:", category.name);

    const subcategories = await Subcategory.find({ category: id });
    console.log("Subcategories found:", subcategories.length);

    const subcategoryIds = subcategories.map((sub) => sub._id);
    console.log("Subcategory IDs:", subcategoryIds);

    const products = await Product.find({
      subcategory: { $in: subcategoryIds },
    }).select("name images subcategory finalPrice");
    console.log("Total products found:", products.length);

    if (products.length === 0) {
      console.log("No products found. Trying a broader search...");
      const allProducts = await Product.find().select(
        "name images subcategory finalPrice"
      );
      console.log("All products in database:", allProducts.length);
    }

    const formattedCategory = {
      _id: category._id,
      name: category.name,
      subcategories: await Promise.all(
        subcategories.map(async (subcategory) => {
          const subcategoryProducts = products.filter(
            (product) =>
              product.subcategory &&
              product.subcategory.toString() === subcategory._id.toString()
          );
          console.log(
            `Products for subcategory ${subcategory.name}:`,
            subcategoryProducts.length
          );

          // If no products found, try direct query
          if (subcategoryProducts.length === 0) {
            console.log(
              `No products found for ${subcategory.name}. Trying direct query...`
            );
            const directProducts = await Product.find({
              subcategory: subcategory._id,
            }).select("name images subcategory finalPrice");
            console.log(
              `Direct query found ${directProducts.length} products for ${subcategory.name}`
            );
            subcategoryProducts.push(...directProducts);
          }

          return {
            _id: subcategory._id,
            name: subcategory.name,
            products: subcategoryProducts.map((product) => ({
              _id: product._id,
              name: product.name,
              image: product.images.length > 0 ? product.images[0] : null,
              finalPrice: product.finalPrice,
            })),
          };
        })
      ),
    };

    console.log(
      "Formatted category:",
      JSON.stringify(formattedCategory, null, 2)
    );

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
