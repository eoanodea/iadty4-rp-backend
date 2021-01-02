/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 2nd January 2021 4:56:23 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { QuestionValidator } from "../contracts/validators";
import { Lesson, Question } from "../entities";
import { GraphQLResolveInfo } from "graphql";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";

@Resolver(() => Question)
export class QuestionResolver {
  @Query(() => [Question])
  public async getQuestions(
    @Arg("lessonId") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Question[]> {
    return ctx.em.find(Question, { lesson: id });
  }

  @Query(() => Question, { nullable: true })
  public async getQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Question | null> {
    return ctx.em.getRepository(Question).findOne({ id });
  }

  @Mutation(() => Question)
  public async addQuestion(
    @Arg("input") input: QuestionValidator,
    @Arg("lessonId") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Question> {
    const question = new Question(input);
    question.lesson = await ctx.em.getRepository(Lesson).findOneOrFail({ id });

    await ctx.em.persist(question).flush();
    return question;
  }

  @Mutation(() => Question)
  public async updateQuestion(
    @Arg("input") input: QuestionValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Question> {
    const question = await ctx.em.getRepository(Question).findOneOrFail({ id });
    question.assign(input);
    await ctx.em.persist(question).flush();
    return question;
  }

  @Mutation(() => Boolean)
  public async deleteQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const question = await ctx.em.getRepository(Question).findOneOrFail({ id });
    await ctx.em.getRepository(Question).remove(question).flush();
    return true;
  }
}
