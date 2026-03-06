import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";

const router = express.Router();

// CREATE PRODUCT
router.post("/products", async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 3) {
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

    const existingProduct = await Product.findOne({ name: name.trim() });

    if (existingProduct) {
      return res.status(400).json({
        error: "Product with this name already exists",
      });
    }

    const newProduct = new Product({
      name: name.trim(),
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

// GET ALL PRODUCTS + SEARCH + SORT + PAGINATION
// Copilot prompt:
// Create an Express.js endpoint that returns products from MongoDB
// with pagination (limit, skip), server-side search and sorting using query parameters.
// The response should include total number of matching products and the data array.
router.get("/products", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = parseInt(req.query.skip as string) || 0;
    const sort = (req.query.sort as string) || "createdAt";
    const search = (req.query.search as string) || "";

    const allowedSortFields = ["name", "price", "stock", "createdAt"];
    if (!allowedSortFields.includes(sort)) {
      return res.status(400).json({
        error: "Invalid sort field",
      });
    }

    if (limit < 0 || skip < 0) {
      return res.status(400).json({
        error: "limit and skip must be non-negative numbers",
      });
    }

    const filter = search
      ? {
          name: { $regex: search, $options: "i" },
        }
      : {};

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      limit,
      skip,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET PRODUCT BY ID
router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by id:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// UPDATE PRODUCT
router.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const updateData: Record<string, unknown> = {};

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 3) {
        return res.status(400).json({
          error: "name must be at least 3 characters",
        });
      }

      const existingProduct = await Product.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (existingProduct) {
        return res.status(400).json({
          error: "Product with this name already exists",
        });
      }

      updateData.name = name.trim();
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({
          error: "price must be a positive number",
        });
      }
      updateData.price = price;
    }

    if (stock !== undefined) {
      if (typeof stock !== "number" || stock < 0 || !Number.isInteger(stock)) {
        return res.status(400).json({
          error: "stock must be a non-negative integer",
        });
      }
      updateData.stock = stock;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE PRODUCT
router.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;