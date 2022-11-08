import "./loadEnvironments.js";
import connectDatabase from "./database/index.js";
import startServer from "./server/index.js";

const {
  PORT: port,
  DATABASE_URL: urlDatabase,
  DATABASE_NAME: databaseName,
} = process.env;

await startServer(+port);
await connectDatabase(urlDatabase, databaseName);
