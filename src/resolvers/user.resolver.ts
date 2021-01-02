/**
 * File: user.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:07:24 pm
 * User: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 2nd January 2021 4:56:23 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { hash } from "argon2";
import { UserValidator } from "../contracts/validators";
import { User } from "../entities/user.entity";
import { GraphQLResolveInfo } from "graphql";
import { hasAuthorization } from "../middleware/auth";
import { ClientSafeError } from "../middleware/errors";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  public async getUsers(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User[]> {
    return ctx.em.find(User, {}).catch((err) => null);
  }

  @Query(() => User, { nullable: true })
  public async getUser(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User | null> {
    return ctx.em.getRepository(User).findOne({ id });
  }

  @Mutation(() => User)
  public async addUser(
    @Arg("input") input: UserValidator,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    try {
      const user = new User(input);
      const hashedPassword = await hash(input.password);
      user.password = hashedPassword;

      await ctx.em.persist(user).flush();

      return user;
    } catch (err) {
      console.log("Error creating user", err);
      throw err;
    }
  }

  @Mutation(() => User)
  public async updateUser(
    @Arg("input") input: UserValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User> {
    const user = await ctx.em.getRepository(User).findOneOrFail({ id });

    if (hasAuthorization(ctx, user.id)) {
      user.assign(input);
      await ctx.em.persist(user).flush();
      return user;
    }
    throw new ClientSafeError("Not Authorized", 401, "AUTH_ERROR");
  }

  @Mutation(() => Boolean)
  public async deleteUser(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const user = await ctx.em.getRepository(User).findOneOrFail({ id });

    if (hasAuthorization(ctx, user.id)) {
      await ctx.em.getRepository(User).remove(user).flush();
      return true;
    }
    throw new ClientSafeError("Not Authorized", 401, "AUTH_ERROR");
  }
}
