import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const signUp = async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "Please fill out all fields" });
    }
    let user = await prisma.user.create({
        data: {
            name,
            username,
            email,
            password,
        },
    });
    res.status(201).json({ user });
}

const allUsers = async (req: Request, res: Response) => {
    let users = await prisma.user.findMany();
    res.send({ users });
};

const getByUserName = async (req: Request, res: Response) => {
    const username = req.params.username;
    let users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    username: {
                        contains: username,
                    },
                },
            ],
        },
    });
    res.send({ users });
};

const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id != req.body.user.id) return res.send("Not a valid request");
    let result = await prisma.user.delete({
        where: {
            id: id,
        },
    });
    res.send("User deleted");
};

export {
    signUp,
    allUsers,
    getByUserName,
    deleteUser
}