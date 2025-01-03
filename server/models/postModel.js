import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,

      required: true,
    },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
