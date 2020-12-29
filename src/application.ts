/**
 * File: application.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:02:08 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 29th December 2020 4:28:33 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

/**
 * Express Imports
 */
import express from "express";
import "express-async-errors";

/**
 * Mikro ORM dependencies and config
 */
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import ormConfig from "./orm.config";

import cors from "cors";

/**
 * GraphQL and Apollo Dependencies
 */
import { GraphQLSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { buildSchema, registerEnumType } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

import { Server } from "http";

/**
 * Resolver modules
 */
import {
  UserResolver,
  LessonResolver,
  AuthResolver,
  QuestionResolver,
} from "./resolvers";

/**
 * Middleware modules
 */
import { buildErrObj, ErrorInterceptor } from "middleware/errors";
import { verifyToken } from "middleware/jwt";
import { QuestionType } from "contracts/validators/enums/questionType.enum";

/**
 * Registering Question Type Enum
 */
registerEnumType(QuestionType, {
  name: "QuestionType",
  description: "Type of the question",
});

export default class Application {
  public orm: MikroORM<IDatabaseDriver<Connection>>;
  public host: express.Application;
  public server: Server;

  /**
   * Connect to MongoDB through Mikro ORM
   */
  public connect = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init(ormConfig);
    } catch (error) {
      console.error("📌 Could not connect to the database", error);
      throw Error(error);
    }
  };

  /**
   * Initilise the server
   */
  public init = async (): Promise<void> => {
    this.host = express();

    if (process.env.NODE_ENV !== "production") {
      this.host.get("/graphql", expressPlayground({ endpoint: "/graphql" }));
    }

    this.host.use(cors());

    try {
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [
          AuthResolver,
          UserResolver,
          LessonResolver,
          QuestionResolver,
        ],
        dateScalarMode: "isoDate",
        globalMiddlewares: [ErrorInterceptor],
      });

      const apollo = new ApolloServer({
        schema,
        context: ({ req, res }) => {
          // Get the user token from the headers.
          const token = req.headers.authorization || "";

          // try to retrieve a user with the token
          const auth = verifyToken(token.replace("Bearer ", ""));

          return { auth, req, res, em: this.orm.em };
        },
      });

      /**
       * Catch errors
       */
      this.host.use(
        (
          error: Error,
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ): void => {
          console.error("📌 Something went wrong", error, error.message);
          if (error.message.includes("Validator")) {
            res.status(400).send(buildErrObj(error));
          }
        }
      );

      apollo.applyMiddleware({ app: this.host });

      const port = process.env.PORT || 4000;
      this.server = this.host.listen(port, () => {
        console.log(`🚀
        Server running at  \x1b[36mhttp://localhost:${port}\x1b[0m
        GraphQL playground running at \x1b[35mhttp://localhost:${port}/graphql\x1b[0m 
        `);
      });
    } catch (error) {
      console.error("📌 Could not start server", error);
    }
  };
}
