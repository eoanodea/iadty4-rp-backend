/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 12th January 2021 6:15:40 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { LessonValidator } from "../contracts/validators";
import { Lesson, Module } from "../entities";
import { GraphQLResolveInfo } from "graphql";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";

@Resolver(() => Lesson)
export class LessonResolver {
  @Query(() => [Lesson])
  public async getLessons(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo,
    @Arg("module") moduleId: string
  ): Promise<Lesson[]> {
    const filter = moduleId ? { module: moduleId } : {};

    return ctx.em.getRepository(Lesson).find(filter);
  }

  @Query(() => Lesson, { nullable: true })
  public async getLesson(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Lesson | null> {
    return ctx.em.getRepository(Lesson).findOne({ id }, ["questions"]);
  }

  @Mutation(() => Lesson)
  public async addLesson(
    @Arg("input") input: LessonValidator,
    @Arg("module") moduleId: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Lesson> {
    const lesson = new Lesson(input);
    lesson.module = await ctx.em
      .getRepository(Module)
      .findOneOrFail({ id: moduleId });

    await ctx.em.persist(lesson).flush();
    return lesson;
  }

  @Mutation(() => Lesson)
  public async updateLesson(
    @Arg("input") input: LessonValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Lesson> {
    const lesson = await ctx.em.getRepository(Lesson).findOneOrFail({ id });
    lesson.assign(input);
    await ctx.em.persist(lesson).flush();
    return lesson;
  }

  @Mutation(() => Boolean)
  public async deleteLesson(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const lesson = await ctx.em.getRepository(Lesson).findOneOrFail({ id });
    await ctx.em.getRepository(Lesson).remove(lesson).flush();
    return true;
  }
}
