/**
 * File: user.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:07:24 pm
 * User: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 10:51:29 am
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { hash } from "argon2";
import { validate } from "class-validator";
import { UserValidator } from "contracts/validators";
import { User } from "entities/user.entity";
import { GraphQLResolveInfo } from "graphql";
// import fieldsToRelations from "graphql-fields-to-relations";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  public async getUsers(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User[]> {
    // const relationPaths = fieldsToRelations(info);
    return ctx.em.find(User, {}).catch((err) => null);
    return ctx.em.getRepository(User).findAll({});
  }

  @Query(() => User, { nullable: true })
  public async getUser(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User | null> {
    // const relationPaths = fieldsToRelations(info);

    return ctx.em.getRepository(User).findOne({ id });
    // return ctx.em.getRepository(User).findOne({ id }, relationPaths);
  }

  @Mutation(() => User)
  public async addUser(
    @Arg("input") input: UserValidator,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    try {
      let user = new User(input);
      const hashedPassword = await hash(input.password);
      user.password = hashedPassword;

      await ctx.em.persist(user).flush();

      return user;
    } catch (err) {
      console.log("errors found!", err);
      throw err;
    }
    // validate(user).then(errors => {
    //   if(errors.length > 0) {
    //   }
  }

  @Mutation(() => User)
  public async updateUser(
    @Arg("input") input: UserValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User> {
    // const relationPaths = fieldsToRelations(info);
    const user = await ctx.em.getRepository(User).findOneOrFail({ id });
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
