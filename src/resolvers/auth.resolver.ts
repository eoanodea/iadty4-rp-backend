/**
 * File: auth.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 28th December 2020 12:24:14 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 1:40:03 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

/**
 * File: auth.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 28th December 2020 12:24:14 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 1:36:28 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { verify } from "argon2";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

import { AuthValidator } from "contracts/validators";
import { LoggedIn, User } from "entities";
import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  ObjectType,
  Field,
  Query,
  Info,
} from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";
import config from "../../config";
import { ClientSafeError } from "middleware/errors";
import { GraphQLResolveInfo } from "graphql";

@Resolver(() => User)
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async userByToken(
    @Arg("token") token: String,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User> {
    console.log("incoming token!", token);
    try {
      const user = await ctx.em.findOneOrFail(User, { id: ctx.req.auth._id });

      return user;
    } catch (err) {
      throw new ClientSafeError(
        err || "Could not authenticate",
        403,
        "AUTH_ERROR"
      );
    }
  }

  @Mutation(() => LoggedIn, { nullable: true })
  async login(
    @Arg("input") input: AuthValidator,
    @Ctx() ctx: MyContext
  ): Promise<{ token: string; user: User }> {
    try {
      const user = await ctx.em.findOneOrFail(User, { email: input.email });
      if (await verify(user.password, input.password)) {
        const token = jwt.sign(
          {
            _id: user.id,
          },
          config.jwtSecret
        );

        ctx.res.cookie("t", token, {
          expires: new Date(Date.now() + parseInt(config.SESSION_TTL, 10)),
          httpOnly: false,
        });
        console.log("yes here is token!", token);
        return { token, user };
      } else throw new ClientSafeError("Incorrect Password", 403, "AUTH_ERROR");
      //   ctx.req.session.userId = user.id;
    } catch (err) {
      console.log("error logging in", err);
      throw err;
    }
  }
}
