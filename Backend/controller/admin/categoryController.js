const Category = require("../../models/categoryModel");
const Subcategory = require("../../models/subCategoryModel");

// Create a new category
createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new subcategory under a category
createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { subcategories: subcategory._id } },
      { new: true }
    );
    res.status(201).json({
      message: "Subcategory created successfully",
      subcategory,
      category,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createCategory, createSubcategory };
