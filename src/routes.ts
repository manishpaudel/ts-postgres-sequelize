import { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";
import projectRouter from "./routes/project.route";
import projectAssignmentRouter from "./routes/projectAssignment.route";

const routes = (app: Express) => {
  app.get("/check", (req: Request, res: Response) =>
    res.status(200).send("Pass")
  );

  app.use("/user", userRouter);
  app.use("/project", projectRouter);
  app.use("/projectAssignment", projectAssignmentRouter);
};

export default routes;
