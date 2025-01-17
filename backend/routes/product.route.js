import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

// fetch all products in database
// route methods and endpoints are defined in the controller
router.get("/", getProducts);

// fetches the product with the associated id
router.get("/:id", getProductById);

// create a new product
router.post("/", createProduct);

// update a product
// '/:id' will be prefixed with '/api/products from server.js
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);

export default router;
