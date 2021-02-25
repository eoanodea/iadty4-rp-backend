/**
 * File: application.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:02:08 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 1:51:28 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

/**
 * Express & Server dependencies
 */
import express from "express";
import "express-async-errors";
import { Server } from "http";
import cors from "cors";

/**
 * Mikro ORM dependencies and config
 */
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import ormConfig from "./orm.config";

/**
 * GraphQL and Apollo Dependencies
 */
import { GraphQLSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { buildSchema, registerEnumType } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

/**
 * Resolver modules
 */
import {
  UserResolver,
  LessonResolver,
  AuthResolver,
  QuestionResolver,
  ModuleResolver,
} from "./resolvers";

/**
 * Middleware modules
 */
import { ErrorInterceptor } from "./middleware/errors.middleware";
import { verifyToken } from "./middleware/";

/**
 * Enum modules
 */
import { QuestionType } from "./contracts/validators/enums/questionType.enum";
import { ModuleType } from "./contracts/validators/enums/moduleType.enum";

/**
 * Registering Module Type Enum
 */
registerEnumType(QuestionType, {
  name: "QuestionType",
  description: "Type of the question",
});

/**
 * Register Lesson Type Enum
 */
registerEnumType(ModuleType, {
  name: "ModuleType",
  description: "Type of lesson",
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

    this.host.use("/images/:name", (req, res) => {
      res.sendFile(__dirname + "/assets/images/" + req.params.name);
    });

    this.host.use(cors());

    try {
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [
          AuthResolver,
          UserResolver,
          LessonResolver,
          QuestionResolver,
          ModuleResolver,
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
            // throw error;
            // res.status(400).send({ errors: [{ message: "Bad" }] });
            // res.status(400).send(buildErrObj(error));
          }
        }
      );

      apollo.applyMiddleware({ app: this.host });

      const port = process.env.PORT || 3000;
      const url = process.env.CLIENT_ORIGIN;

      this.server = this.host.listen(port, () => {
        console.log(
          `[Easy Piano V${process.env.npm_package_version}] - Starting server in ${process.env.NODE_ENV}`
        );
        console.log(`🚀
          Server running at  \x1b[36m${url}:${port}\x1b[0m
        `);
        if (process.env.NODE_ENV !== "production")
          console.log(
            `GraphQL playground running at \x1b[35m${url}:${port}/graphql\x1b[0m`
          );
      });
    } catch (error) {
      console.error("📌 Could not start server", error);
    }
  };
}
