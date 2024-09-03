import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const likeController = async (req: Request, res: Response) => {
  const postId = Number(req.params.postId);
  const user = req.body.user;
  const userid = user.id;
  if (!user) {
    return res.status(401).json({ message: "Please login first!" });
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userid_postid: {
        userid: userid,
        postid: postId,
      },
    },
  });

  if (existingLike) {
    await prisma.post.update({
      where: { id: postId },
      data: {
        likeCount: { decrement: 1 },
      },
    });
    await prisma.like.delete({
      where: {
        userid_postid: {
          userid: userid,
          postid: postId,
        },
      },
    });

    return res.status(200).json({ success: true, message: "Unliked the post" });
  } else {
    await prisma.like.create({
      data: {
        userid: userid,
        postid: postId,
      },
    });
    try {
      await prisma.post.update({
        where: { id: postId },
        data: {
          likeCount: { increment: 1 },
        },
      });

      res.status(200).json({ success: true, message: "Liked the post" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to like post" });
    }
  }
};

const getLikeNumber = async (req: Request, res: Response) => {
  const postId = Number(req.params.postId);

  const likes = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      likeCount: true,
      like: {
        select: {
          userid: true,
        },
      },
    },
  });
  res.send(likes);
};

const checkUserLikeStatus = async (req: Request, res: Response) => {
  const postId = Number(req.params.postId);
  const user = req.body.user;
  const userid = user?.id;

  if (!user) {
    return res.status(401).json({ message: "Please login first!" });
  }

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userid_postid: {
          userid: userid,
          postid: postId,
        },
      },
    });
    if (existingLike) {
      return res
        .status(200)
        .json({ success: true, message: "Already liked" });
    }
    return res.status(200).json({ success: false, message: "Not liked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check like status" });
  }
};

export { likeController, getLikeNumber, checkUserLikeStatus };
