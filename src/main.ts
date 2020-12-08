// This has to be imported for typegraphQL
import "reflect-metadata";
import config from "./config";
// import Database from './database';
import createApp from "./server";
// import { PORT, BASE_URL } from "./constants";

/**
 *  Start the app asynchronously to allow us to use  await
 */
const start = async () => {
  // Setup middleware & gql server
  const app = await createApp();
  // Start the server
  app
    .listen(config.PORT, () => {
      console.log(`
  Server running at  \x1b[36mhttp://${config.BASE_URL}:${config.PORT}\x1b[0m

  GraphQL playground running at \x1b[35mhttp://${config.BASE_URL}:${config.PORT}/graphql\x1b[0m
  `);
    })
    .on("error", (err: any, req: any) => {
      console.error("Server Error: ", err);
      process.exit();
    });
};

start().catch((err) => console.error(err));
