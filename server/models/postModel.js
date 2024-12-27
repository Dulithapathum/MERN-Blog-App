import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["News", "Tech", "Lifestyle", "Travel", "Health", "Food"],
      required: true,
    },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
