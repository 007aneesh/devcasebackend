import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const createPost = async (req: Request, res: Response) => {
  const user = req.body.user;
  if (!user) {
    throw new Error("Please login again!");
  }
  let authorId = user.id;
  const { imageUrl, content } = req.body;
  let post = await prisma.post.create({
    data: {
      authorId,
      imageUrl,
      content,
    },
  });
  return res.send({ post });
};

const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.send(posts);
};

const userPost = async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) {
    res.send("No User Provided");
  }
  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  });
  res.send(posts);
};

const updatePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = req.body.user;
  if (!user) {
    throw new Error("Please login first!");
  }

  const { imageUrl, content } = req.body;

  let post = await prisma.post.update({
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
};

const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = req.body.user;
  if (!user) {
    throw new Error("Please login first!");
  }
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json({ msg: "Delete Successfully!" });
};

export {createPost, userPost, getAllPosts, updatePost, deletePost}