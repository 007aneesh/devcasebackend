import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addComment = async (req: Request, res: Response) => {
  const user = req.body.user;
  const { content } = req.body;
  const postId = Number(req.params.postid);
  if (!user) {
    res.status(401).send("No User Provided");
    return;
  }
  try {
    let comment = await prisma.comment.create({
      data: {
        userId: user.id,
        postId: postId,
        content: content,
      },
    });
    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send({ error: "Server Error: Cannot create a comment!" });
  }
};

const getPostComment = async (req: Request, res: Response) => {
  const postId = Number(req.params.postid);
  const comments = await prisma.comment.findMany({ where: { postId } });
  res.status(200).send(comments);
};

const deleteComment = async (req: Request, res: Response) => {
  const user = req.body.user;
  const commentId = Number(req.params.commentId);
  if (!user) {
    res.status(401).send("User not authenticated!");
    return;
  }
  try {
    await prisma.comment.delete({ where: { id: commentId } });
    res.status(200).send({ message: "Deleted the comment" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server Error: Couldn't delete the comment" });
  }
};

export { addComment, getPostComment, deleteComment };
