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
  try {
    let updatedPost;
    const postId = req.params.id;
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return next(new HttpError("All fields are required", 422));
    }

    if (!req.files.thumbnail) {
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );
    } else {
      const oldPost = await Post.findById(postId);
      if (oldPost) {
        fs.unlink(
          path.join(__dirname, "..", "upload", oldPost.thumbnail),
          (err) => {
            if (err) {
              return next(
                new HttpError(
                  err.message || "Could not delete old thumbnail",
                  500
                )
              );
            }
          }
        );
      }

      const thumbnail = req.files.thumbnail;
      if (thumbnail.size > 2 * 1024 * 1024) {
        return next(
          new HttpError(
            "Thumbnail is too big. File size should be less than 2MB",
            422
          )
        );
      }

      const filename = thumbnail.name;
      const splittedFilename = filename.split(".");
      const newFilename =
        splittedFilename[0] +
        uuid() +
        "." +
        splittedFilename[splittedFilename.length - 1];

      await thumbnail.mv(path.join(__dirname, "..", "upload", newFilename));

      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description, thumbnail: newFilename },
        { new: true }
      );
    }

    if (!updatedPost) {
      return next(new HttpError("Couldn't update the post", 400));
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(new HttpError(error.message || "Something went wrong", 500));
  }
};

// ===================Delete  Post===================
// DELETE:api/post/:id
// PROTECTED
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return next(new HttpError("Post unavailable", 400));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }

    const filePath = path.join(__dirname, "..", "upload", post.thumbnail);
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error deleting thumbnail file:", err);
        return next(new HttpError("Failed to delete the thumbnail", 500));
      }

      await Post.findByIdAndDelete(postId);

      const currentUser = await User.findById(post.creator);
      if (currentUser) {
        const updatedPostCount = Math.max(0, currentUser.posts - 1);
        await User.findByIdAndUpdate(post.creator, { posts: updatedPostCount });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    });
  } catch (error) {
    next(new HttpError(error.message || "An error occurred", 500));
  }
};
