import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/productModel.js";
import ApiFeature from "../utils/apiFeature.js";
import { handleSuccess, responseHandler } from "../utils/responseHandler.js";

// Create a new product -- admin only
const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  handleSuccess(res, 201, "Product created successfully", product);
});

// Update a product -- admin only
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  responseHandler(res, 200, "Product updated successfully", product, next);
});

// Delete a product -- admin only
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  responseHandler(res, 200, "Product deleted successfully", product, next);
});

// Get all products
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeature(Product.find(), req.query).search();
  const products = await apiFeature.query;
  const totalProducts = await Product.countDocuments();

  handleSuccess(res, 200, "All Products fetched successfully", {
    total_products: totalProducts,
    products: products,
  });
});

// Get a single product
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  responseHandler(
    res,
    200,
    "Single Product fetched successfully",
    product,
    next
  );
});

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
