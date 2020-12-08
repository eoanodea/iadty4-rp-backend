/**
 * File: mikro-orm.config.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:15:33 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 7th December 2020 11:02:40 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { User } from "./models/User";

import { MikroORM } from "@mikro-orm/core";
import path from "path";

import config from "./config";

// The configuration for the ORM - Any Entities added need to be put in here, other than that probably doesn't need to be touched
// tslint:disable-next-line: no-object-literal-type-assertion
export default {
  type: "mongo",
  clientUrl: config.MONGO_URI,
  debug: config.env === "development",
  entities: [User],
} as Parameters<typeof MikroORM.init>[0];
