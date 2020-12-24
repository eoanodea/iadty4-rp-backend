/**
 * File: orm.config.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:02:40 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 24th December 2020 3:37:06 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";

import config from "../config";

import { User, Lesson, Base } from "./entities";

const options: Options = {
  type: "mongo",
  entities: [User, Lesson, Base],
  dbName: "music-app",
  clientUrl: config.mongoUri,
  highlighter: new MongoHighlighter(),
  debug: config.env === "development",
};

export default options;