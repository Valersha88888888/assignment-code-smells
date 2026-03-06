import express, { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";

const router = express.Router();

// CREATE ORDER
router.post("/orders", async (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, items } = req.body;

    if (!customerName || !customerEmail || !items) {
      return res.status(400).json({ error: "Missing order data" });
    }

    let totalPrice = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      totalPrice,
      createdAt: new Date(),
    });

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});


// GET ALL ORDERS
router.get("/orders", async (req: Request, res: Response) => {
  try {

    const search = req.query.search as string;
    const sort = req.query.sort as string || "createdAt";

    const filter = search
      ? { customerName: { $regex: search, $options: "i" } }
      : {};

    const orders = await Order.find(filter)
      .populate("items.product")
      .sort({ [sort]: 1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;