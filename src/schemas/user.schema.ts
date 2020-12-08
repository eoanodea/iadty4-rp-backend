/**
 * File: user.scheme.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:10:12 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 8th December 2020 2:28:33 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import {
  validatePassword,
  createUser,
  getUserById,
  getUserByEmail,
  // passwordResetRequest,
  // changePassword,
} from "../controllers/user.controller";
import { User } from "../models/User";
import { ApolloContext } from "../types/ApolloContext";
import { authCheck } from "../middleware/gql/auth/authMiddleware";
// import { COOKIE_NAME, ROLE_CACHE_PREFIX, SESSION_EXPIRY } from "../constants";
import { RegisterInput } from "./inputs/RegisterInput";
import { ClientSafeError } from "../middleware/gql/errors";
// import { roles } from "../data/roles";

@Resolver(User)
export class UserResolver {
  // Get all users -> Delete this for prod
  @Query(() => [User], { nullable: true })
  async users(@Ctx() ctx: ApolloContext): Promise<User[]> {
    return ctx.em.find(User, {}).catch((err) => err);
  }

  // Get The user by their authenticated cookie -> middleware confirms what user it is and puts id into session
  @Query(() => User, { nullable: true })
  @UseMiddleware(authCheck)
  async getSelf(@Ctx() ctx: ApolloContext) {
    return getUserById(
      "1", // ctx.req.session.userId,
      ctx.em
    ).catch((err) => err);
  }

  // Register a new user
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() ctx: ApolloContext
  ): Promise<User | null> {
    return createUser(input, ctx.em)
      .then((user: any) => {
        // Attach the users authentication to a cookie
        // ctx.req.session.userId = (user && user.id) || null;
        return user;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  // Authenticate and log in user
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: ApolloContext
  ): Promise<User | null> {
    return getUserByEmail(email, ctx.em)
      .then((user) => validatePassword(password, user))
      .then(async (user) => {
        // Attach the users authentication to a cookie
        // ctx.req.session.userId = user.id;
        // await ctx.redis.set(
        //   ROLE_CACHE_PREFIX + user.id,
        //   user.role,
        //   "ex",
        //   SESSION_EXPIRY
        // );
        return user;
      })
      .catch((err) => {
        throw new ClientSafeError(
          err || "Incorrect Password",
          403,
          "AUTH_ERROR"
        );
      });
  }

  // Logout user and remove cookie
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ApolloContext): Promise<boolean> {
    return new Promise((resolve, rej) =>
      // Destroy the session in redis
      // ctx.req.session.destroy((err) => {
      //   // Clear the cookie from the response
      //   ctx.res.clearCookie(COOKIE_NAME);
      //   if (err) {
      //     // If this happens it means the user was probably not logged in when they logged out somehow
      //     console.error(`Cant log out!`);
      //     return rej(false);
      //   } else {
      //     resolve(true);
      //   }
      // })
      console.log("yes")
    );
  }

  // Send an email with a password request token
  // @Mutation(() => boolean)
  // async forgotPassword(@Arg("email") email: string, @Ctx() ctx: ApolloContext) {
  //   passwordResetRequest(email, ctx.em, ctx.redis);
  //   return true;
  // }

  // Use a token to change the password
  // @Mutation(() => User)
  // async changePassword(
  //   @Arg("token") token: string,
  //   @Arg("password") password: string,
  //   @Ctx() ctx: ApolloContext
  // ): Promise<User> {
  //   return changePassword(token, password, ctx.em, );
  // }

  /**
   *  Format what comes back from the database into
   * @param user
   */
  // @FieldResolver()
  // role(@Root() user: User) {
  //   // Default role to guest if not found to be safe
  //   return { id: user.role, name: roles[user.role || 6] };
  // }
}
