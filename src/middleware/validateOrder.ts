import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

export const validateOrderBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, items } = req.body;

  if (!userId || typeof userId !== "string" || !isValidObjectId(userId)) {
    return res.status(400).json({
      error: "userId must be a valid MongoDB ObjectId"
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: "items must be a non-empty array"
    });
  }

  for (const item of items) {
    if (!item.productId || !isValidObjectId(item.productId)) {
      return res.status(400).json({
        error: "Each item must contain a valid productId"
      });
    }

    if (
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0 ||
      item.quantity > 999
    ) {
      return res.status(400).json({
        error: "quantity must be a positive integer between 1 and 999"
      });
    }
  }

  next();
};
