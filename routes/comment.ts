import express from "express";
import { verifyToken } from "../middleware/auth";
import {addComment, getPostComment, deleteComment} from "../controllers/comment";
const router = express.Router();

router.post("/:postid", verifyToken, addComment);

router.get("/:postid", getPostComment);

router.delete(
  "/:commentId",
  verifyToken,
  deleteComment
);

export default router;
