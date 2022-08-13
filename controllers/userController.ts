import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const { user } = new PrismaClient()

const getUser = async (req: Request, res: Response) => {
    try {
        const users = await user.findMany({
        select: {
            username: true,
            Posts: true
        }
        })

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({
            Message: error
        });
    }
}

const createUser = async (req: Request, res: Response) => {
    const { username } = req.body;

    try {
        const userExists = await user.findUnique({
            where: {
                username
            },
            select: {
                username: true
            }
        })

        if(userExists) return res.status(400).json({
            Message: "User Already Exists, Try AnotherOne"
        })

        const newUser = await user.create({
            data: {
                username
            }
        })

        res.status(201).json({
          Message: "New user created!",
          user: newUser,
        });

    } catch (error) {
        res.status(400).json({
          Message: error,
        });
    }
}

export {getUser, createUser};