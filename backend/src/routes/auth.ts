import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient"
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        const defaultTodo = "Keep coding..";
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET not defined");

        const token = jwt.sign({id: user.id}, secret, {expiresIn: '24h'});
        res.json({token});
    } catch (err: any) {
        console.log(err.message)
        res.sendStatus(503)
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) { return res.status(404).send({message: "User not found"}) }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) { return res.status(401).send({message: "Password isn't valid"})}

        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET not defined");

        const token = jwt.sign({id: user.id}, secret, {expiresIn: '24h'});
        res.json({token});
    } catch (err: any) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router;