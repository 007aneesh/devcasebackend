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
      email: email,
    },
  });
  if (!user || user.password != password) {
    return res.status(400).json({ error: "Invalid credentials!!" });
  }

  let token = createJwtToken(user);
  // res.cookie("token", token);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 
  });
  res.status(201).json({ message: "User login successfully", user });
};

export {login};