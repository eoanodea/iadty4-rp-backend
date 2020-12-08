/**
 * File: ApolloContext.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:14:20 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 7th December 2020 10:31:26 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */


import { Request, Response } from "express";
import { OrmEntityManger } from "./OrmEntityManger";

/**
 * This is the context which apollo passes through to the resolvers
 * Mainly used to get the request and response objects, as you would normally use with express
 * We also pass the Entity manager instance through
 */
export interface ApolloContext {
  req: Request;
  res: Response;
  em: OrmEntityManger;
}
