import { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";

const routes = (app: Express) => {
  app.get("/check", (req: Request, res: Response) => res.status(200).send());

  app.use("/user/", userRouter);
};

export default routes;
