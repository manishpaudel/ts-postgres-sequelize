import db from "../models";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.create({
      id: uuidv4(),
      name,
      email,
      password,
    });
    return res.status(200).send(user);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll({
      //get with associations
      include: {
        model: "db.Project",
      },
    });
    return res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};
