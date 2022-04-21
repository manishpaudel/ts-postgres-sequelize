import express from "express";
import morgan from "morgan";
import db from "./models";
import routes from "./routes";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

console.log("on index", process.env.PORT);
const port = process.env.PORT || 8000;

//sync creates all the tables in models if not exists
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("App listening on port ", port);
      routes(app);
    });
  })
  .catch((e: any) => {
    console.log("Error on syncing database>", e);
  });
