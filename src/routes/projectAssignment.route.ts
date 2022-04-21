import { Router } from "express";
import { assignProjectController } from "../controllers/projectAssignment.controller";

const router = Router();

router.post("/", assignProjectController);

export default router;
