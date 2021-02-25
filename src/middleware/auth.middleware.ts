/**
 * File: auth.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Tuesday, 29th December 2020 2:44:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 1:51:22 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { MyContext } from "../utils/interfaces/context.interface";

/**
 * Checks if a user is authenticated, and if they are the user
 * matching the Object ID
 *
 * @param {MyContext} ctx
 * @param {string} id
 */
export const hasAuthorization = (ctx: MyContext, id: string) => {
  return ctx.auth && ctx.auth._id === id;
};
