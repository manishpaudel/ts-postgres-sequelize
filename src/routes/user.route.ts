import { Router } from "express";
import { createUserHandler } from "../controllers/user.controller";
import { createUserValidator } from "../validators/user.validator";

const router = Router();

router.post("/create", createUserValidator, createUserHandler);

export default router;
