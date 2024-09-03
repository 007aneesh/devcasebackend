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
exports.deleteUser = exports.getByUserName = exports.allUsers = exports.signUp = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ msg: "Please fill out all fields" });
    }
    try {
        let existingUser = yield prisma.user.findUnique({
            where: { username: username, email: email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        let user = yield prisma.user.create({
            data: {
                name,
                username,
                email,
                password,
            },
        });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred during registration" });
    }
});
exports.signUp = signUp;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield prisma.user.findMany();
    res.send({ users });
});
exports.allUsers = allUsers;
const getByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    let users = yield prisma.user.findMany({
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
});
exports.getByUserName = getByUserName;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (id != req.body.user.id)
        return res.send("Not a valid request");
    let result = yield prisma.user.delete({
        where: {
            id: id,
        },
    });
    res.send("User deleted");
});
exports.deleteUser = deleteUser;
