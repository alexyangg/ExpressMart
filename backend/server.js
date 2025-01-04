import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";

dotenv.config(); // allows us to use environment variables

const app = express();

app.use(express.json()); // middleware to parse req.body

app.use("/api/products", productRoutes); // route for API products

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
