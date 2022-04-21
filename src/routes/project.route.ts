import { Router } from "express";
const router = Router();
import {
  createProjectController,
  getProjectsController,
} from "../controllers/project.controller";

router.get("/", getProjectsController);
router.post("/", createProjectController);

export default router;
