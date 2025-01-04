import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const app = express();

app.use(express.json()); // middleware to parse req.body

// fetch all products in database
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// create a new product
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Name, price, and image are required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save(); // save the product to the database
    res.status(201).json({ success: true, product: newProduct }); // code 201 means created
  } catch (error) {
    console.error("Error creating the product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// update a product
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating the product: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// delete a product
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting the product: ", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
