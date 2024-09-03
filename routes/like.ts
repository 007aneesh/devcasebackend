import express from "express";
import { verifyToken } from "../middleware/auth";
import { likeController, getLikeNumber, checkUserLikeStatus } from "../controllers/like";

const router = express.Router();

router.post("/:postId", verifyToken, likeController);
router.get("/:postId", getLikeNumber);
router.get("/:postId/like-status", verifyToken, checkUserLikeStatus);

export default router;
