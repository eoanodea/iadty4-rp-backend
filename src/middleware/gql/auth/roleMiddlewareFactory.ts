/**
 * File: roleMiddlewareFactory.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:12:37 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 7th December 2020 11:02:40 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { ApolloContext } from "../../../types/ApolloContext";
import { MiddlewareFn } from "type-graphql";
// import { ClientSafeError } from "../errors";
// import { roles } from "../../../data/roles";
// import { ROLE_CACHE_PREFIX } from "../../../constants";

/**
 * This is actually a middleware factory
 * @param role {number} This is the role number that
 */
export const roleMiddleware = (role: number): MiddlewareFn<ApolloContext> => {
  return async ({ context: ctx }, next) => {
    // if (
    //   !!ctx.req.session.userId &&
    //   role ===
    //     parseInt(
    //       await ctx.redis.get(ROLE_CACHE_PREFIX + ctx.req.session.userId),
    //       10
    //     )
    // ) {
    return next();
    // } else {
    //   throw new ClientSafeError(
    //     `You are not authorised to make this request, this is a ${roles[role]} only feature`,
    //     403
    //   );
    // }
  };
};
