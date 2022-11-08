import { model, Schema } from "mongoose";
import type { RobotSchemaStrcuture } from "./robotTypes.js";

const RobotSchema = new Schema<RobotSchemaStrcuture>({
  name: String,
  image: String,
  stats: {
    speed: {
      type: Number,
      max: 10,
      min: 0,
    },
    strength: {
      type: Number,
      max: 10,
      min: 0,
    },
    createdAt: Date,
  },
});

const Robot = model<RobotSchemaStrcuture>("Robot", RobotSchema, "robots");

export default Robot;
