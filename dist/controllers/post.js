"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getAllPosts = exports.userPost = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    if (!user) {
        return res.status(401).json({ msg: "Please login first!" });
    }
    let authorId = user.id;
    const { imageUrl, content } = req.body;
    let post = yield prisma.post.create({
        data: {
            authorId,
            authorUserName: user.username,
            imageUrl,
            content,
        },
    });
    return res.send({ post });
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma.post.findMany({
        orderBy: {
            publishedAt: "desc",
        },
    });
    res.send(posts);
});
exports.getAllPosts = getAllPosts;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    if (!user) {
        res.send("No User Provided");
    }
    const posts = yield prisma.post.findMany({
        where: {
            authorId: user.id,
        },
        orderBy: {
            publishedAt: "desc",
        },
    });
    res.send(posts);
});
exports.userPost = userPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const user = req.body.user;
    if (!user) {
        throw new Error("Please login first!");
    }
    const { imageUrl, content } = req.body;
    let post = yield prisma.post.update({
        where: {
            id: id,
        },
        data: {
            authorId: user.id,
            imageUrl,
            content,
        },
    });
    res.send(post);
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const user = req.body.user;
    if (!user) {
        throw new Error("Please login first!");
    }
    yield prisma.post.delete({
        where: {
            id: id,
        },
    });
    res.status(200).json({ msg: "Delete Successfully!" });
});
exports.deletePost = deletePost;
