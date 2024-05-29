const Product = require("../../../models/productModel");

// Utility function to populate product fields
const populateProduct = (query) => {
  return query.populate("category").populate("subcategory").populate("reviews");
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await populateProduct(Product.find());
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

// Get a specific product
const getProductById = async (req, res) => {
  try {
    const product = await populateProduct(Product.findById(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product by ID: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const {
    name,
    brand,
    description,
    price,
    discountPrice,
    stock,
    images,
    category,
    subcategory,
    offers,
    deliveryOptions,
  } = req.body;

  // Validate required fields
  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ message: "Name, price, and category are required." });
  }

  try {
    // Calculate finalPrice based on discountPrice, if available
    const finalPrice = discountPrice ? price - discountPrice : price;

    const newProduct = new Product({
      name,
      brand,
      description,
      price,
      discountPrice,
      stock,
      images,
      category,
      subcategory,
      offers,
      deliveryOptions,
      finalPrice,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(`Error creating product: ${error.message}`);
    res.status(500).json({ message: "Failed to create product." });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    brand,
    description,
    price,
    discountPrice,
    stock,
    images,
    category,
    subcategory,
    offers,
    deliveryOptions,
  } = req.body;

  try {
    const updatedProduct = await populateProduct(
      Product.findByIdAndUpdate(
        id,
        {
          name,
          brand,
          description,
          price,
          discountPrice,
          stock,
          images,
          category,
          subcategory,
          offers,
          deliveryOptions,
          finalPrice: discountPrice ? price - discountPrice : price,
        },
        { new: true }
      )
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    res.status(500).json({ message: "Failed to update product." });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(`Error deleting product: ${error.message}`);
    res.status(500).json({ message: "Failed to delete product." });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
