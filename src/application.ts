/**
 * File: application.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:02:08 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 23rd December 2020 6:44:08 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

// import express from "express";
import express from "express";
import "express-async-errors";

import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import bodyParser from "body-parser";
// import { PublisherType } from "contracts/enums/publisherType.enum";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { Server } from "http";
import ormConfig from "./orm.config";
import { UserResolver } from "./resolvers/user.resolver";
// import { BookResolver } from "resolvers/book.resolver";
import { buildSchema, registerEnumType } from "type-graphql";
import { MyContext } from "./utils/interfaces/context.interface";

// TODO: create service for this
// registerEnumType(PublisherType, {
//   name: "PublisherType",
//   description: "Type of the publisher",
// });

export default class Application {
  public orm: MikroORM<IDatabaseDriver<Connection>>;
  //@ts-ignore
  public host: express.Application;
  public server: Server;

  public connect = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init(ormConfig);
      const migrator = this.orm.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (migrations && migrations.length > 0) {
        await migrator.up();
      }
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
        resolvers: [UserResolver],
        dateScalarMode: "isoDate",
      });

      this.host.post(
        "/graphql",
        bodyParser.json(),
        graphqlHTTP((req: any, res: any) => ({
          schema,
          context: { req, res, em: this.orm.em.fork() } as MyContext,
          customFormatErrorFn: (error: any) => {
            throw error;
          },
        }))
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.host.use(
        (
          error: Error,
          //@ts-ignore
          req: express.Request,
          //@ts-ignore
          res: express.Response,
          //@ts-ignore
          next: express.NextFunction
        ): void => {
          console.error("📌 Something went wrong", error);
          res.status(400).send(error);
        }
      );

      const port = process.env.PORT || 4000;
      this.server = this.host.listen(port, () => {
        console.log(`🚀 http://localhost:${port}/graphql`);
      });
    } catch (error) {
      console.error("📌 Could not start server", error);
    }
  };
}
