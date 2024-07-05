import express from "express";
import { verifyToken } from "../middleware/auth";
import { follow, getFollowers, unfollow } from "../controllers/follow"
const router = express.Router();

router.post(
  "/:followingId",
  verifyToken,
  follow
);
router.get("/", getFollowers);
router.delete(
  "/:followingId",
  verifyToken,
  unfollow
);

export default router;
