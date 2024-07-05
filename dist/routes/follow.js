"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const follow_1 = require("../controllers/follow");
const router = express_1.default.Router();
router.post("/:followingId", auth_1.verifyToken, follow_1.follow);
router.get("/", follow_1.getFollowers);
router.delete("/:followingId", auth_1.verifyToken, follow_1.unfollow);
exports.default = router;
