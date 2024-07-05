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
exports.getLikeNumber = exports.likeController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const likeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = Number(req.params.postId);
    const user = req.body.user;
    const userid = user.id;
    if (!user) {
        return res.status(401).json({ message: "Please login first!" });
    }
    const existingLike = yield prisma.like.findUnique({
        where: {
            userid_postid: {
                userid: userid,
                postid: postId,
            },
        },
    });
    if (existingLike) {
        const unlikePost = yield prisma.post.update({
            where: { id: postId },
            data: {
                likeCount: { decrement: 1 },
            },
        });
        yield prisma.like.delete({
            where: {
                userid_postid: {
                    userid: userid,
                    postid: postId,
                },
            },
        });
        return res.status(200).json({ success: true, message: "Unliked the post" });
    }
    else {
        yield prisma.like.create({
            data: {
                userid: userid,
                postid: postId,
            },
        });
        try {
            yield prisma.post.update({
                where: { id: postId },
                data: {
                    likeCount: { increment: 1 },
                },
            });
            res.status(200).json({ success: true, message: "Liked the post" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to like post" });
        }
    }
});
exports.likeController = likeController;
const getLikeNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = Number(req.params.postId);
    const likes = yield prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            likeCount: true,
            like: {
                select: {
                    userid: true
                }
            }
        },
    });
    res.send(likes);
});
exports.getLikeNumber = getLikeNumber;
