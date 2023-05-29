import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/productModel.js";
import ApiFeature from "../utils/apiFeature.js";
import { successHandler, notFoundHandler } from "../utils/responseHandler.js";

// Create a new product -- admin only
const createProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  successHandler(res, 201, "Product created successfully", product);
});

// Update a product -- admin only
const updateProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  notFoundHandler(product);
  successHandler(res, 200, "Product updated successfully", product);
});

// Delete a product -- admin only
const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  notFoundHandler(product);
  successHandler(res, 200, "Product deleted successfully", product);
});

// Get all products
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  const totalProducts = await Product.countDocuments();

  successHandler(res, 200, "All Products fetched successfully", {
    totalProducts,
    products,
  });
});

// Get a single product
const getSingleProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  notFoundHandler(product);
  successHandler(res, 200, "Single Product fetched successfully", product);
});

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
