"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controllers/post");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.verifyToken, post_1.createPost);
router.get("/all", post_1.getAllPosts);
router.get("/", auth_1.verifyToken, post_1.userPost);
router.put("/:id", auth_1.verifyToken, post_1.updatePost);
router.delete("/:id", auth_1.verifyToken, post_1.deletePost);
exports.default = router;
