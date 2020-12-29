/**
 * File: context.interface.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:04:14 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 4:38:17 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";

interface Auth {
  _id: string;
  iat: number;
}

export interface MyContext {
  auth: Auth | null;
  req: Request;
  res: Response;
  em: EntityManager<IDatabaseDriver<Connection>>;
}
