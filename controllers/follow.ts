import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const follow = async (req: Request, res: Response) => {
  const followingId = Number(req.params.followingId);
  const user = req.body.user;
  if (!user) {
    throw new Error("Please login first!");
  }
  const existingFollowing = await prisma.follows.findUnique({
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
  await prisma.follows.create({
    data: {
      followerId: user.id,
      followingId: followingId,
    },
  });
  return res.status(200).json({ message: "Following successful" });
};

const getFollowers = async (req: Request, res: Response) => {
  let follow = await prisma.follows.findMany();
  res.send({ follow });
};

const unfollow = async (req: Request, res: Response) => {
  const followingId = Number(req.params.followingId);
  const user = req.body.user;
  if (!user) {
    throw new Error("Please login first!");
  }
  await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: followingId,
      },
    },
  });

  return res.status(200).json({ message: "Unfollowed successfully" });
};

export {follow, getFollowers, unfollow};