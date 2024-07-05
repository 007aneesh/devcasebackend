"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const comment_1 = require("../controllers/comment");
const router = express_1.default.Router();
router.post("/:postid", auth_1.verifyToken, comment_1.addComment);
router.get("/:postid", comment_1.getPostComment);
router.delete("/:commentId", auth_1.verifyToken, comment_1.deleteComment);
exports.default = router;
