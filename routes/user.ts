import express from "express";
import { signUp, allUsers, getByUserName, deleteUser } from "../controllers/user";
const router = express.Router();

import { verifyToken } from "../middleware/auth";

router.post("/", signUp);
router.get("/", allUsers);
router.get("/:username", getByUserName);
router.delete("/:id", verifyToken, deleteUser);

export default router;
