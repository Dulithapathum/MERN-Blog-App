import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  console.log("user routes");
  res.json({ message: "User routes working" });
});

export default router;
