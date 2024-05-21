const mongoose = require("mongoose");

const validCategories = [
  "Apparel & Accessories",
  "Electronics",
  "Home & Garden",
  "Health & Beauty",
  "Toys & Games",
  "Books & Media",
  "Sports & Outdoors",
  "Automotive",
  "Baby & Kids",
  "Food & Grocery",
  "Pet Supplies",
  "Office Supplies",
  "Jewelry & Watches",
  "Crafts & DIY",
  "Art & Collectibles",
  "Travel & Luggage",
  "Fitness & Wellness",
  "Home Improvement",
  "Electronics Accessories",
  "Gifts & Occasions",
  "Music & Instruments",
  "Party Supplies",
  "Services",
];

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validCategories.includes(value);
        },
        message: (props) => `${props.value} is not a valid category`,
      },
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
