/**
 * File: server.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:15:43 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 7th December 2020 11:02:40 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

// import {
//     BASE_URL,
//     PORT,
//     SESSION_SECRET,
//     COOKIE_NAME,
//     inProd,
//     REDIS_URL,
//     SESSION_EXPIRY,
//   } from './constants';

import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import compress from "compression";
//   import connectRedis from 'connect-redis';
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
//   import Redis from 'ioredis';
import logger from "morgan";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { MikroORM } from "@mikro-orm/core";
import ormConfig from "./mikro-orm.config";
import { ErrorInterceptor } from "./middleware/gql/errors";
import config from "./config";
import { Application } from "express";
// import { ErrorInterceptor } from "./middleware/gql/errors";
// import { PilotResolver } from "./schemas/PilotResolver";
// import { ClientResolver } from "./schemas/ClientResolver";

// For performance this will determine how many cores you have and set node to use them all, not great practice to do this here so prefer to do this in the .env
// import { cpus } from 'os';
// process.env.UV_THREADPOOL_SIZE = cpus().length.toString();

// const redis = new Redis(REDIS_URL);
export const schema = buildSchema({
  resolvers: [UserResolver],
  globalMiddlewares: [ErrorInterceptor],
});

const createApp = async () => {
  // Initialize MikroOrm / DB
  const orm = await MikroORM.init(ormConfig);
  // Our server application will be an instance of express
  //   const app = express();
  const app: Application = express();

  // We need to create an apollo server to run our graphQL - the context lets us pass the request into the resolvers, we also send the orm through here too
  const apollo = new ApolloServer({
    schema: await schema,
    context: ({ req, res }) => ({ req, res, em: orm.em }),
    // playground: { tabs: [{ headers }] },
  });

  // Any normal routes can be set up here, currently there are none
  // const router = express.Router();
  // app.use('/', router);

  // Middleware
  if (config.env === "development") app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Header stuff - cant use graphql playground with it on
  // if (!inProd) app.use(helmet());
  // Compress responses
  app.use(compress());

  // Set up redis -> max age is how long till cookie expires in seconds
  //   const RedisStore = connectRedis(session);
  //   app.use(
  //     session({
  //       store: new RedisStore({
  //         client: redis,
  //       }),
  //       name: COOKIE_NAME,
  //       secret: SESSION_SECRET,
  //       resave: false,
  //       saveUninitialized: false,
  //       cookie: {
  //         httpOnly: true,
  //         secure: inProd,
  //         maxAge: SESSION_EXPIRY,
  //       },
  //     })
  //   );

  // BEFORE PROD: Fix CRSF to prevent attacks -> ask eoan what he does
  // app.use(crsf());

  // Set up cors -> list frontend origins here
  app.use(
    cors({
      credentials: true,
      origin: [
        `http://${config.BASE_URL}:${config.PORT}`,
        "http://localhost:8080",
      ],
    })
  );
  // Pass on express middleware to apollo - cors is set to false because other apollo overrides it with acceptance from all origins
  apollo.applyMiddleware({ app, cors: false });
  return app;
};

export default createApp;
