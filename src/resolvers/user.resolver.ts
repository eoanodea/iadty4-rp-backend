/**
 * File: user.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:07:24 pm
 * User: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 23rd December 2020 6:07:58 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import UserValidator from "contracts/validators/User.validator";
import { User } from "entities/user.entity";
import { GraphQLResolveInfo } from "graphql";
import fieldsToRelations from "graphql-fields-to-relations";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  public async getUsers(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User[]> {
    const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(User).findAll(relationPaths);
  }

  @Query(() => User, { nullable: true })
  public async getUser(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User | null> {
    const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(User).findOne({ id }, relationPaths);
  }

  @Mutation(() => User)
  public async addUser(
    @Arg("input") input: UserValidator,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    const user = new User(input);
    await ctx.em.persist(user).flush();
    return user;
  }

  @Mutation(() => User)
  public async updateUser(
    @Arg("input") input: UserValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User> {
    const relationPaths = fieldsToRelations(info);
    const user = await ctx.em
      .getRepository(User)
      .findOneOrFail({ id }, relationPaths);
    user.assign(input);
    await ctx.em.persist(user).flush();
    return user;
  }

  @Mutation(() => Boolean)
  public async deleteUser(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const user = await ctx.em.getRepository(User).findOneOrFail({ id });
    await ctx.em.getRepository(User).remove(user).flush();
    return true;
  }
}
