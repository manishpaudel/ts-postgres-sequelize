import { Request, Response, NextFunction } from "express";
import { createUser } from "../services/user.service";
import { omit } from "lodash";
import logger from "../utils/logger";
import { validationResult } from "express-validator";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors);
    }

    const user = await createUser(req.body);
    return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
};
