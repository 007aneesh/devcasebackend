import express from "express";
import { verifyToken } from "../middleware/auth";
import { likeController, getLikeNumber } from "../controllers/like";

const router = express.Router();

router.post("/:postId", verifyToken, likeController);
router.get("/:postId", getLikeNumber);

export default router;
