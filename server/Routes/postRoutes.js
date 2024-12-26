import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  console.log("post routes");
  res.json({ message: "Post routes working" });
});

export default router;
