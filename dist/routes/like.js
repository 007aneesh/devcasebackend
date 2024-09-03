"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const like_1 = require("../controllers/like");
const router = express_1.default.Router();
router.post("/:postId", auth_1.verifyToken, like_1.likeController);
router.get("/:postId", like_1.getLikeNumber);
router.get("/:postId/like-status", auth_1.verifyToken, like_1.checkUserLikeStatus);
exports.default = router;
