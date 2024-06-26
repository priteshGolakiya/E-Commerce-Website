const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, required: true },
    images: [{ type: String }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    finalPrice: { type: String },
    offers: [{ type: String }],
    deliveryOptions: String,
  },
  {
    toJSON: { virtuals: true }, // Ensure virtuals are included in JSON output
    toObject: { virtuals: true }, // Ensure virtuals are included in object output
  }
);

productSchema.virtual("averageRating").get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / this.reviews.length;
});

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

// productSchema.virtual("finalPrice").get(function () {
//   return this.discountPrice ? this.price - this.discountPrice : this.price;
// });

module.exports = mongoose.model("Product", productSchema);
