/**
 * File: orm.config.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:02:40 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 23rd December 2020 6:55:12 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

// import { MikroORM } from "@mikro-orm/core";

// export default {
//   migrations: {
//     path: "./src/migrations",
//     tableName: "migrations",
//     transactional: true,
//   },
//   tsNode: process.env.NODE_DEV === "true" ? true : false,
//   user: "root",
//   password: "root",
//   dbName: "mikro-orm-graphql-data",
//   host: "localhost",
//   port: 5432,
//   entities: ["dist/**/*.entity.js"],
//   entitiesTs: ["src/**/*.entity.ts"],
//   type: "postgresql",
// } as Parameters<typeof MikroORM.init>[0];

import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import config from "../config";

import { User, Base } from "./entities";

const options: Options = {
  type: "mongo",
  entities: [User, Base],
  dbName: "music-app",
  clientUrl: config.mongoUri,
  highlighter: new MongoHighlighter(),
  debug: true,
};

export default options;
