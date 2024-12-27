import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { HttpError } from "../models/errorModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ===================Create  Post ===================
// POST:api/post/:id
// PROTECTED
export const createPost = (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    const thumbnail = req.files.thumbnail;
    if (
      !title ||
      !category ||
      !description ||
      !req.files ||
      !req.files.thumbnail
    ) {
      return next(
        new HttpError("All fields, including thumbnail, are required", 422)
      );
    }

    if (thumbnail.size > 2 * 1024 * 1024) {
      return next(
        new HttpError(
          "Thumbnail is too big. File size should be less than 2MB",
          422
        )
      );
    }

    let filename = thumbnail.name;
    let splittedFilename = filename.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];

    thumbnail.mv(
      path.join(__dirname, "..", "upload", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(error));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });

          if (!newPost) {
            return next(new HttpError(" Post couldn't be created", 422));
          }
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    next(new HttpError(error));
  }
};

// ===================Get All Post===================
// GET:api/posts
// UNPROTECTED
export const getAllPosts = (req, res, next) => {
  res.json("get all post");
};

// ===================Get Single  Post===================
// GET:api/posts:id
// UNPROTECTED
export const getPost = (req, res, next) => {
  res.json("get single post");
};

// ===================Get Post By Category===================
// GET:api/posts/categories/:category
// UNPROTECTED
export const getCatPosts = (req, res, next) => {
  res.json("Get Post By Category");
};

// ===================Get Users/Authors Post===================
// GET:api/posts/users/:id
// UNPROTECTED
export const getUserPosts = (req, res, next) => {
  res.json("Get Users/Authors Post");
};

// ===================Edit  Post===================
// PATCH:api/post/:id
// PROTECTED
export const editPost = (req, res, next) => {
  res.json("Edit  Post");
};

// ===================Delete  Post===================
// DELETE:api/post/:id
// PROTECTED
export const deletePost = (req, res, next) => {
  res.json("delete post");
};
