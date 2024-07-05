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
exports.deleteComment = exports.getPostComment = exports.addComment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const { content } = req.body;
    const postId = Number(req.params.postid);
    if (!user) {
        res.status(401).send("No User Provided");
        return;
    }
    try {
        let comment = yield prisma.comment.create({
            data: {
                userId: user.id,
                postId: postId,
                content: content,
            },
        });
        res.status(201).send(comment);
    }
    catch (error) {
        res.status(500).send({ error: "Server Error: Cannot create a comment!" });
    }
});
exports.addComment = addComment;
const getPostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = Number(req.params.postid);
    const comments = yield prisma.comment.findMany({ where: { postId } });
    res.status(200).send(comments);
});
exports.getPostComment = getPostComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const commentId = Number(req.params.commentId);
    if (!user) {
        res.status(401).send("User not authenticated!");
        return;
    }
    try {
        yield prisma.comment.delete({ where: { id: commentId } });
        res.status(200).send({ message: "Deleted the comment" });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Server Error: Couldn't delete the comment" });
    }
});
exports.deleteComment = deleteComment;
