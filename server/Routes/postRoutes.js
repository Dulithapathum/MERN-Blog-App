import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
} from "../controllers/postController.js";
const router = Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.get("/categories/category", getCatPosts);
router.get("/users/:id", getUserPosts);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);

export default router;
