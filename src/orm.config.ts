/**
 * File: orm.config.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:02:40 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 24th February 2021 4:11:57 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { Image } from "entities/image.entity";

import config from "../config";

import {
  User,
  Lesson,
  Base,
  Question,
  QuestionText,
  Module,
  Note,
  Streak,
} from "./entities";

const options: Options = {
  type: "mongo",
  entities: [
    User,
    Module,
    Lesson,
    Question,
    QuestionText,
    Note,
    Base,
    Streak,
    Image,
  ],
  dbName: "music-app",
  clientUrl: config.mongoUri,
  highlighter: new MongoHighlighter(),
  debug: config.env === "development",
  ensureIndexes: true,
};

export default options;
