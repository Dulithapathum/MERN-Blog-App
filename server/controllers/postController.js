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
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ===================Get Single  Post===================
// GET:api/posts:id
// UNPROTECTED
export const getPost = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id).sort({ updatedAt: -1 });
    if (!posts) {
      return next(new HttpError(" Post not found", 404));
    }
    res.status(200).json(posts);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ===================Get Post By Category===================
// GET:api/posts/categories/:category
// UNPROTECTED
export const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ updatedAt: -1 });

    res.status(200).json(catPosts);
  } catch (error) {
    next(new HttpError(error));
    // console.log("dddd");
  }
};

// ===================Get Users/Authors Post===================
// GET:api/posts/users/:id
// UNPROTECTED
export const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ updatedAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ===================Edit  Post===================
// PATCH:api/post/:id
// PROTECTED
export const editPost = async (req, res, next) => {
  res.json("Edit  Post");
};

// ===================Delete  Post===================
// DELETE:api/post/:id
// PROTECTED
export const deletePost = async (req, res, next) => {
  res.json("delete post");
};
