import express from "express";
import { authorizeRoles, authenticateUser } from "../controllers/auth.js";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteProductReview,
  getAllProducts,
  getProductReviews,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(authenticateUser, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .delete(authenticateUser, authorizeRoles("admin"), deleteProduct)
  .put(authenticateUser, authorizeRoles("admin"), updateProduct);
router.route("/product/review/new").put(authenticateUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(authenticateUser, deleteProductReview);

export default router;
