const Product = require("../../../models/productModel");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory")
      .populate("reviews");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subcategory")
      .populate("reviews");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
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
    const updatedProduct = await Product.findByIdAndUpdate(
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
      },
      { new: true }
    )
      .populate("category")
      .populate("subcategory")
      .populate("reviews");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
