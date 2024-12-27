import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import upload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

connectDB(); // Database connection

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// File Upload  Middleware
app.use(upload());
app.use("/upload", express.static(__dirname + "/upload"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Error Handle Middleware
app.use(notFound);
app.use(errorHandler);

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
