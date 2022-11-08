import type { Document } from "mongoose";

export interface UserStructure {
  username: string;
  password: string;
}

export interface UserSchemaStrcuture extends UserStructure, Document {}
