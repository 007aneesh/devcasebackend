"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const secretKey = process.env.JWTSECRET || "aneesh";
const createJwtToken = (user) => {
    return jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: "24h" });
};
exports.createJwtToken = createJwtToken;
const verifyToken = (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: "Please login first!" });
    }
    let decode = jsonwebtoken_1.default.verify(token, secretKey);
    if (decode) {
        req.body.user = decode;
        return next();
    }
    res.send("Token invalid");
};
exports.verifyToken = verifyToken;
