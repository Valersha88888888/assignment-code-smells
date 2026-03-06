import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const PORT = 4000;

mongoose
  .connect("mongodb+srv://adminlulu:admin88888888@cluster0.5cfekx8.mongodb.net/copilot-assignment")
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });