/**
 * File: application.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:02:08 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 4:47:29 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

// import express from "express";
import express from "express";
import "express-async-errors";

import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";

import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { Server } from "http";
import ormConfig from "./orm.config";
import { UserResolver, LessonResolver, AuthResolver } from "./resolvers";
// import { BookResolver } from "resolvers/book.resolver";
import { buildSchema } from "type-graphql";
import { MyContext } from "./utils/interfaces/context.interface";
import {
  buildErrObj,
  ClientSafeError,
  ErrorInterceptor,
  // safeErrorMessage,
} from "middleware/errors";
import { ApolloServer } from "apollo-server-express";
import { verifyToken } from "middleware/jwt";

// TODO: create service for this
// registerEnumType(PublisherType, {
//   name: "PublisherType",
//   description: "Type of the publisher",
// });

export default class Application {
  public orm: MikroORM<IDatabaseDriver<Connection>>;
  public host: express.Application;
  public server: Server;

  public connect = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init(ormConfig);
    } catch (error) {
      console.error("📌 Could not connect to the database", error);
      throw Error(error);
    }
  };

  public init = async (): Promise<void> => {
    this.host = express();

    if (process.env.NODE_ENV !== "production") {
      this.host.get("/graphql", expressPlayground({ endpoint: "/graphql" }));
    }

    this.host.use(cors());

    try {
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [AuthResolver, UserResolver, LessonResolver],
        dateScalarMode: "isoDate",
        globalMiddlewares: [ErrorInterceptor],
      });

      const apollo = new ApolloServer({
        schema,
        // formatError: (error: any) => {
        //   throw error;
        // },
        context: ({ req, res }) => {
          // Get the user token from the headers.
          const token = req.headers.authorization || "";

          // try to retrieve a user with the token
          const auth = verifyToken(token.replace("Bearer ", ""));

          return { auth, req, res, em: this.orm.em };

          //return { req, res, em: this.orm.em };
        },
      });

      // this.host.post(
      //   "/graphql",
      //   bodyParser.json(),
      //   graphqlHTTP((req: any, res: any) => ({
      //     schema,
      //     context: { req, res, em: this.orm.em.fork() } as MyContext,
      // customFormatErrorFn: (error: any) => {
      //   throw error;
      // },
      //   }))
      // );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
