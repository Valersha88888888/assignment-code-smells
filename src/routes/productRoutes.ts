import express, { Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

router.post("/products", async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || typeof name !== "string" || name.length < 3) {
      return res.status(400).json({
        error: "name is required and must be at least 3 characters",
      });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        error: "price must be a positive number",
      });
    }

    if (typeof stock !== "number" || stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({
        error: "stock must be a non-negative integer",
      });
    }

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({
        error: "Product with this name already exists",
      });
    }

    const newProduct = new Product({
      name,
      price,
      stock,
      createdAt: new Date(),
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

export default router;