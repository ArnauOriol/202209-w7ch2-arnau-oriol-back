import { model, Schema } from "mongoose";
import type { UserSchemaStrcuture } from "./userTypes.js";

const UserSchema = new Schema<UserSchemaStrcuture>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<UserSchemaStrcuture>("User", UserSchema, "users");

export default User;
