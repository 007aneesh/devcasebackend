"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
router.post("/", user_1.signUp);
router.get("/", user_1.allUsers);
router.get("/:username", user_1.getByUserName);
router.delete("/:id", auth_1.verifyToken, user_1.deleteUser);
exports.default = router;
