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
exports.unfollow = exports.getFollowers = exports.follow = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const followingId = Number(req.params.followingId);
    const user = req.body.user;
    if (!user) {
        throw new Error("Please login first!");
    }
    const existingFollowing = yield prisma.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: user.id,
                followingId: followingId,
            },
        },
    });
    if (existingFollowing) {
        return res
            .status(400)
            .json({ message: "You are already following this user" });
    }
    yield prisma.follows.create({
        data: {
            followerId: user.id,
            followingId: followingId,
        },
    });
    return res.status(200).json({ message: "Following successful" });
});
exports.follow = follow;
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let follow = yield prisma.follows.findMany();
    res.send({ follow });
});
exports.getFollowers = getFollowers;
const unfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const followingId = Number(req.params.followingId);
    const user = req.body.user;
    if (!user) {
        throw new Error("Please login first!");
    }
    yield prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: user.id,
                followingId: followingId,
            },
        },
    });
    return res.status(200).json({ message: "Unfollowed successfully" });
});
exports.unfollow = unfollow;
