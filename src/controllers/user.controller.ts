import db from "../models";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserAttributes } from "../models/user";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user: UserAttributes = await db.User.create({
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
    const users: [UserAttributes] = await db.User.findAll({
      attributes: { exclude: ["password"] },
      //get with associations
      include: {
        model: db.Project,
        attributes: ["id", "title", "status"],

        //to exclude association attributes
        through: {
          attributes: [],
        },
      },
    });

    return res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users: UserAttributes = await db.User.findByPk(id, {
      attributes: { exclude: ["password"] },
      //get with associations
      include: {
        model: db.Project,
        attributes: ["id", "title", "status"],

        //to exclude association attributes
        through: {
          attributes: [],
        },
      },
    });
    return res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};

export const getUserByEmailController = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const users: UserAttributes = await db.User.findOne({
      where: { email },

      attributes: { exclude: ["password"] },
      //get with associations
      include: {
        model: db.Project,
        attributes: ["id", "title", "status"],

        //to exclude association attributes
        through: {
          attributes: [],
        },
      },
    });
    return res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: UserAttributes = await db.User.findOne({ where: { email } });
    const a = user.authenticate(password, user.password);
    return res.status(200).send(a);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Error on creating user: ${error.message}`);
  }
};
