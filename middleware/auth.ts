import jwt from "jsonwebtoken";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
const secretKey = process.env.JWTSECRET || "aneesh";
export const createJwtToken = (user: {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  return jwt.sign(user, secretKey, { expiresIn: "24h" });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.token;
  let decode = jwt.verify(token, secretKey);
  if (decode) {
    req.body.user = decode;
    return next();
  }
  res.send("Token invalid");
};
