import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config(); // allows us to use environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // go to root

app.use(express.json()); // middleware to parse req.body
app.use("/api/products", productRoutes); // route for API products

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // make dist folder static assets

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); // send index.html for all routes other than /api/products
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
