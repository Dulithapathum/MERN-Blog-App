import mongoose from "mongoose";

const DB_URL =
  "mongodb+srv://Dulitha:DulithaP25@dulithadev.srxch.mongodb.net/?retryWrites=true&w=majority&appName=DulithaDev"; // DB URL

const connectDB = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

export default connectDB;
