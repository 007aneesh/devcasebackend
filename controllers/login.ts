import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createJwtToken } from "../middleware/auth";

const prisma = new PrismaClient();

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("Not a valid email!!");
  }
  if (user.password != password) {
    throw new Error("Not a valid password");
  }

  let token = createJwtToken(user);
  res.cookie("token", token);
  res.send({ user });
};

export {login};