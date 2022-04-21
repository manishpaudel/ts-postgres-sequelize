import db from "../models";
import { Request, Response } from "express";
import { ProjectAssignmentAttributes } from "../models/projectassignment";

export const assignProjectController = async (req: Request, res: Response) => {
  try {
    const { userId, projectId } = req.body;
    const assign: ProjectAssignmentAttributes =
      await db.ProjectAssignment.create({
        UserId: userId,
        ProjectId: projectId,
      });
    return res.status(200).send(assign);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};
