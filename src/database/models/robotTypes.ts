import type { Document } from "mongoose";

export interface RobotStructure {
  robotId: string;
  name: string;
  image: string;
  stats: RobotStatsStructure;
}

export interface RobotStatsStructure {
  speed: number;
  strength: number;
  createdAt: string;
}

export interface RobotSchemaStrcuture extends RobotStructure, Document {}
