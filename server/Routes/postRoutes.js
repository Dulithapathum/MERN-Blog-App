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
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.get("/categories/category", getCatPosts);
router.get("/users/:id", getUserPosts);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
