/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 12:58:47 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";

import { LessonValidator } from "../contracts/validators";
import { Lesson, Module, User } from "../entities";
import { MyContext } from "../utils/interfaces/context.interface";
import { hasAuthorization, ClientSafeError } from "../middleware";
import { ObjectId } from "@mikro-orm/mongodb";

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
    // if(ctx.auth && ctx.auth._id) {
    //   const user = await ctx.em.getRepository(User).findOneOrFail(ctx.auth._id, ['completedLessons'])
    //   user.completedLessons.forEach(lesson => {

    //   })
    // }

    // return lessons;
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

  @Mutation(() => Lesson)
  public async completeLesson(
    @Arg("lessonId") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Lesson> {
    const lesson = await ctx.em.getRepository(Lesson).findOneOrFail({ id });
    const user = await ctx.em
      .getRepository(User)
      .findOne({ _id: new ObjectId(ctx.auth._id) }, ["streak"]);

    if (user) {
      const date = new Date().getTime() - 24 * 60 * 60 * 1000;

      if (new Date(date) < user.streak.updatedAt) {
        user.streak.number++;
      } else {
        user.streak.number = 0;
      }

      await ctx.em.persist(user).flush();
      return lesson;
    }
    throw new ClientSafeError("Not Authorized", 401, "AUTH_ERROR");
  }
}
