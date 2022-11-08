import type { Document, Types } from "mongoose";

export interface UserStructure {
  username: string;
  password: string;
  email: string;
}

export interface UserSchemaStrcuture extends UserStructure, Document {
  _id: Types.ObjectId;
}
