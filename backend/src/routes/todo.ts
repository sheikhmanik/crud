import express, { Request, Response } from "express";
import prisma from "../prismaClient";

declare module "express-serve-static-core" {
    interface Request {
        task: string;
        completed: boolean;
        userId: number;
    }
}

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.userId
            }
        })
        res.json(todos);        
    } catch (err) {
        res.json({message: "No todos.."})
    }
})

router.post('/', async (req: Request, res: Response) => {
    
    const { task } = req.body;
    console.log("req.userId: ", req.userId);
    
    try {
        const todo = await prisma.todo.create({
            data: {
                task,
                userId: req.userId
            }
        })
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create todo." });
    }
})

router.put('/:id', async (req, res) => {
    
    const { completed, task } = req.body;
    const { id } = req.params;

    try {
        const updateTodo = await prisma.todo.updateMany({
            where: {
                userId: req.userId,
                id: parseInt(id)
            },
            data: {
                completed: completed !== undefined ? completed : undefined,
                task: task ? task : undefined
            }
        })
        res.json(updateTodo)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update todo." });
    }
})

router.delete('/:id', async (req, res) => {
    
    const { id } = req.params;
    
    try {
        await prisma.todo.deleteMany({
            where: {
                userId: req.userId,
                id: parseInt(id)
            }
        })
        res.json({message: "Todo deleted."})
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete todo." });
    }
})

export default router;