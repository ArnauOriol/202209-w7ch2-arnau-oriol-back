import chalk from "chalk";
import application from "../app.js";

const { log } = console;

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = application.listen(port, () => {
      log(chalk.green(`Server listening on port ${port}`));
      resolve(server);
    });

    server.on("error", (error: Error) => {
      log(chalk.red(`There was an error in server ${error.message}`));
      reject(error);
    });
  });

export default startServer;
