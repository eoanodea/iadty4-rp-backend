/**
 * File: auth.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 28th December 2020 12:24:14 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 2nd January 2021 4:58:10 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { verify } from "argon2";
import { AuthValidator } from "../contracts/validators";
import { LoggedIn, User } from "../entities";
import { Resolver, Mutation, Ctx, Arg, Query, Info } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";
import { ClientSafeError } from "../middleware/errors";
import { GraphQLResolveInfo } from "graphql";
import { generateToken } from "../middleware/jwt";

@Resolver(() => User)
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async get(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User> {
    try {
      const user = await ctx.em.findOneOrFail(User, { id: ctx.auth._id });

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
        const token = generateToken(user.id);

        return { token, user };
      } else throw new ClientSafeError("Incorrect Password", 403, "AUTH_ERROR");
    } catch (err) {
      throw new ClientSafeError(
        "Incorrect Email or Password",
        403,
        "AUTH_ERROR"
      );
    }
  }
}
