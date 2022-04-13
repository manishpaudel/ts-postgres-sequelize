import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const authorizeUser = async (email: string, password: string) => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return false;
    }
    const isValid = user.comparePassword(password);
    if (!isValid) return false;
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
