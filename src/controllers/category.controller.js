import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.models.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Category name is required");
  }

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    throw new ApiError(400, "Category already exists");
  }

  const category = await Category.create({ name });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories || categories.length === 0) {
    throw new ApiError(404, "No categories found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

export { createCategory, getAllCategories };
