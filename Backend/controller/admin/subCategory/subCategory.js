  const asyncHandler = require("express-async-handler");
  const Category = require("../../../models/categoryModel");
  const Subcategory = require("../../../models/subCategoryModel");

  // Create a new subcategory under a category
  const createSubcategory = asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;
      const { categoryId } = req.params;

      // Check if the subcategory already exists
      const existingSubcategory = await Subcategory.findOne({ name });
      if (existingSubcategory) {
        return res.status(400).json({ message: "Subcategory already exists" });
      }

      // Create and save the new subcategory
      const subcategory = new Subcategory({ name, category: categoryId });
      await subcategory.save();

      // Update the parent category to include the new subcategory
      const category = await Category.findByIdAndUpdate(
        categoryId,
        { $push: { subcategories: subcategory._id } },
        { new: true }
      );

      // Send success response
      res.status(201).json({
        error: false,
        success: true,
        message: "Subcategory created successfully",
        subcategory,
        category,
      });
    } catch (err) {
      // Send error response
      res.status(500).json({ error: true, success: false, message: err.message });
    }
  });

  // Get all subcategories
  const getAllSubcategories = asyncHandler(async (req, res) => {
    try {
      const subcategories = await Subcategory.find().populate("category");
      res.status(200).json({ error: false, success: true, subcategories });
    } catch (err) {
      res.status(500).json({ error: true, success: false, error: err.message });
    }
  });

  // Get subcategory by ID
  const getSubcategoryById = asyncHandler(async (req, res) => {
    try {
      const subcategory = await Subcategory.findById(req.params.id).populate(
        "category"
      );
      if (!subcategory) {
        return res
          .status(404)
          .json({
            error: true,
            success: false,
            message: "Subcategory not found",
          });
      }
      res.status(200).json({ error: false, success: true, subcategory });
    } catch (err) {
      res.status(500).json({ error: true, success: false, error: err.message });
    }
  });

  // Update subcategory by ID
  const updateSubcategory = asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;
      const subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!subcategory) {
        return res
          .status(404)
          .json({
            error: true,
            success: false,
            message: "Subcategory not found",
          });
      }
      res
        .status(200)
        .json({
          error: false,
          success: true,
          message: "Subcategory updated successfully",
          subcategory,
        });
    } catch (err) {
      res.status(500).json({ error: true, success: false, error: err.message });
    }
  });

  // Delete subcategory by ID
  const deleteSubcategory = asyncHandler(async (req, res) => {
    try {
      const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
      if (!subcategory) {
        return res
          .status(404)
          .json({
            error: true,
            success: false,
            message: "Subcategory not found",
          });
      }
      res
        .status(200)
        .json({
          error: false,
          success: true,
          message: "Subcategory deleted successfully",
        });
    } catch (err) {
      res.status(500).json({ error: true, success: false, error: err.message });
    }
  });

  module.exports = {
    createSubcategory,
    getAllSubcategories,
    getSubcategoryById,
    updateSubcategory,
    deleteSubcategory,
  };
