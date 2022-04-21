import db from "../models";
import { Request, Response } from "express";

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const { title, status } = req.body;
    const project = await db.Project.create({
      title,
      status,
    });
    return res.status(200).send(project);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};

export const getProjectsController = async (req: Request, res: Response) => {
  try {
    const projects = await db.Project.findAll({});
    return res.status(200).send(projects);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};
