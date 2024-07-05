import express from "express";
import {createPost, userPost, getAllPosts, updatePost, deletePost} from "../controllers/post";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyToken, createPost);

router.get("/all", getAllPosts);

router.get("/", verifyToken, userPost);

router.put("/:id", verifyToken, updatePost);

router.delete("/:id", verifyToken, deletePost);

export default router;
