import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("MongoDB Connected");
  } catch (e) {
    logger.error("error on connecting database>>", e);
  }
};

export default connect;
