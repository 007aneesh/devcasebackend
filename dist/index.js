"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const user_1 = __importDefault(require("./routes/user"));
const login_1 = __importDefault(require("./routes/login"));
const follow_1 = __importDefault(require("./routes/follow"));
const post_1 = __importDefault(require("./routes/post"));
const like_1 = __importDefault(require("./routes/like"));
const comment_1 = __importDefault(require("./routes/comment"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send(`Heyy`);
});
app.use("/user", user_1.default);
app.use("/login", login_1.default);
app.use("/follow", follow_1.default);
app.use("/post", post_1.default);
app.use("/like", like_1.default);
app.use("/comment", comment_1.default);
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
