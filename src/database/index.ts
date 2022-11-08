import chalk from "chalk";
import mongoose from "mongoose";

const { log } = console;

const connectDatabase = async (url: string, dbName: string) => {
  try {
    await mongoose.connect(url, { dbName });
    log(chalk.blue("Database is on"));
  } catch (error: unknown) {
    log(chalk.red(`Error on connection`, (error as Error).message));
  }
};

export default connectDatabase;
