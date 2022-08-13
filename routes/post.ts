import { Router } from "express";
import { getUsersPost, createPost } from "../controllers/postController";

const router = Router();

router.get("/:userId", getUsersPost);
router.post("/", createPost);

export default router;
