const Product = require("../../../models/productModel");

// Utility function to populate product fields
const populateProduct = (query) => {
  return query.populate("category").populate("subcategory").populate("reviews");
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await populateProduct(Product.find()).exec();
    const productsWithAverageRating = products.map((product) => {
      const productObj = product.toObject({ virtuals: true });
      return {
        ...productObj,
        averageRating: product.averageRating,
      };
    });
    res.status(200).json(productsWithAverageRating);
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

// Get a specific product
const getProductById = async (req, res) => {
  try {
    const product = await populateProduct(
      Product.findById(req.params.id)
    ).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    const productObj = product.toObject({ virtuals: true });
    res.status(200).json({
      ...productObj,
      averageRating: product.averageRating,
    });
  } catch (error) {
    console.error(`Error fetching product by ID: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
