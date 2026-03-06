import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";

const app = express();

app.use(express.json());

app.use("/api", productRoutes);

const PORT = 3000;

mongoose.connect(
    "mongodb+srv://adminlulu:admin88888888@cluster0.5cfekx8.mongodb.net/copilot-assignment"
)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });