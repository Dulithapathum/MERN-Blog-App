import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL =
  "mongodb+srv://Dulitha:DulithaP25@dulithadev.srxch.mongodb.net/?retryWrites=true&w=majority&appName=DulithaDev";
app.use(cors());
app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
