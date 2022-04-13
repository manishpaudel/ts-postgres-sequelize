import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

//for typescript type matching
//mongoose generally doesn't prefer extending mongoose.Document
//can be performed differently using typegoose and others

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(pw: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("before saving", async (next) => {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  //do our old method here
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  return next();
});

userSchema.methods.authenticate = async (pw: string): Promise<Boolean> => {
  const user = this as UserDocument;
  return bcrypt.compare(pw, user.password).catch((e) => false);
};

export default mongoose.model<UserDocument>("User", userSchema);
