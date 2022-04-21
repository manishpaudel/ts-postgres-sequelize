import { Router } from "express";
import {
  createUserController,
  getUsersController,
  getUserByIdController,
  getUserByEmailController,
  loginController,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUserController);
router.post("/login", loginController);

router.get("/", getUsersController);
router.get("/email/:email", getUserByEmailController);
router.get("/:id", getUserByIdController);

export default router;
