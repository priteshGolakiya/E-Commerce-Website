// controllers/reviewController.js
const Review = require("../../../models/reviewModel");
const Product = require("../../../models/productModel");

const addReview = async (req, res) => {
  const { userId, productId, rating, review } = req.body;

  // Check if the user has already reviewed the product
  const existingReview = await Review.findOne({
    user: userId,
    product: productId,
  });
  if (existingReview) {
    return res
      .status(400)
      .json({ message: "User has already reviewed this product." });
  }

  // Create a new review
  const newReview = new Review({
    user: userId,
    product: productId,
    rating,
    review,
  });

  await newReview.save();

  // Update the product's average rating
  const product = await Product.findById(productId).populate("reviews");
  const averageRating = product.averageRating;

  res.status(201).json({ message: "Review added successfully", averageRating });
};

module.exports = { addReview };
