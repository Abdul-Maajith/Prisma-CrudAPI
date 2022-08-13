import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsersPost = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const postsByUserId = await prisma.post.findMany({
      where: {
        userId,
      },
    });

    if(!postsByUserId) return res.status(400).json({
      Message: "User Doesn't Exists!",
    });

    res.status(200).json(postsByUserId);

  } catch (error) {
    res.status(400).json({
      Message: error,
    });
  }
};

const createPost = async (req: Request, res: Response) => {
  const { title, post, userId } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) return res.status(400).json({
        Message: "User Doesn't Exists!",
    });

    const newPost = await prisma.post.create({
      data: {
        title,
        post,
        userId,
      },
    });

    res.status(201).json({
      Message: "New post created!",
      user: newPost,
    });

  } catch (error) {
    res.status(400).json({
      Message: error,
    });
    console.log(error)
  }
};

export { getUsersPost, createPost };
