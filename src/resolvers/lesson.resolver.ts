/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 24th December 2020 3:42:33 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { LessonValidator } from "contracts/validators";
import { User, Lesson } from "entities";

// import { Publisher } from 'entities/publisher.entity';
import { GraphQLResolveInfo } from "graphql";
// import fieldsToRelations from "graphql-fields-to-relations";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";

@Resolver(() => Lesson)
export class LessonResolver {
  @Query(() => [Lesson])
  public async getLessons(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Lesson[]> {
    // const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(Lesson).findAll({});
  }

  @Query(() => Lesson, { nullable: true })
  public async getLesson(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Lesson | null> {
    // const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(Lesson).findOne({ id });
  }

  @Mutation(() => Lesson)
  public async addLesson(
    @Arg("input") input: LessonValidator,
    @Arg("userId") userId: string,
    @Arg("publisherId", { nullable: true }) publisherId: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Lesson> {
    const lesson = new Lesson(input);
    lesson.user = await ctx.em.getRepository(User).findOneOrFail(
      { id: userId }
      //, fieldsToRelations(info, { root: "user" })
    );

    // if (publisherId) {
    //   lesson.publisher = await ctx.em.getRepository(Publisher).findOneOrFail(
    //     { id: publisherId },
    //     fieldsToRelations(info, {
    //       root: 'publisher',
    //     }),
    //   );
    // }
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
    // const relationPaths = fieldsToRelations(info);
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
