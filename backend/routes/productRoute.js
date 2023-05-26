import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();


router.route('/products').get(getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').get(getSingleProduct).delete(deleteProduct).put(updateProduct)



export default router;