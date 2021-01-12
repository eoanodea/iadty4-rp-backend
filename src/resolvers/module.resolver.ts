/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 12th January 2021 4:59:42 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { ModuleValidator } from "../contracts/validators";
import { ModuleType } from "../contracts/validators/enums/moduleType.enum";
import { Module } from "../entities";
import { GraphQLResolveInfo } from "graphql";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";

@Resolver(() => Module)
export class ModuleResolver {
  @Query(() => [Module])
  public async getModules(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo,
    @Arg("type", { nullable: true }) type?: ModuleType
  ): Promise<Module[]> {
    const filter = type ? { type } : {};

    return ctx.em.getRepository(Module).find(filter);
  }

  @Query(() => Module, { nullable: true })
  public async getModule(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Module | null> {
    return ctx.em.getRepository(Module).findOne({ id }, ["lessons"]);
  }

  @Mutation(() => Module)
  public async addModule(
    @Arg("input") input: ModuleValidator,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Module> {
    const module = new Module(input);
    await ctx.em.persist(module).flush();
    return module;
  }

  @Mutation(() => Module)
  public async updateModule(
    @Arg("input") input: ModuleValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Module> {
    const module = await ctx.em.getRepository(Module).findOneOrFail({ id });
    module.assign(input);
    await ctx.em.persist(module).flush();
    return module;
  }

  @Mutation(() => Boolean)
  public async deleteModule(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const module = await ctx.em.getRepository(Module).findOneOrFail({ id });
    await ctx.em.getRepository(Module).remove(module).flush();
    return true;
  }
}
