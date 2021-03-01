/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 5:18:16 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { QuestionTextValidator } from "../contracts/validators";
import { Question, QuestionText } from "../entities";
import { GraphQLResolveInfo } from "graphql";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";
import { ClientSafeError } from "../middleware/errors.middleware";

@Resolver(() => QuestionText)
export class QuestionTextResolver {
  @Query(() => [QuestionText])
  public async getQuestionTexts(
    @Arg("question") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<QuestionText[]> {
    return ctx.em.find(QuestionText, { question: id });
  }

  @Query(() => QuestionText, { nullable: true })
  public async getQuestionText(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<QuestionText | null> {
    return ctx.em.getRepository(QuestionText).findOne({ id });
  }

  @Mutation(() => QuestionText)
  public async addQuestionText(
    @Arg("input") input: QuestionTextValidator,
    @Arg("question") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<QuestionText> {
    const questionText = new QuestionText(input);

    try {
      questionText.question = await ctx.em
        .getRepository(Question)
        .findOneOrFail({ id });

      await ctx.em.persist(questionText).flush();

      return questionText;
    } catch (err) {
      console.log("Error Adding QuestionText", err);
      throw new ClientSafeError(
        "Could not add question text",
        500,
        "INTERNAL_SERVER_ERR"
      );
    }
  }

  @Mutation(() => QuestionText)
  public async updateQuestionText(
    @Arg("input") input: QuestionTextValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<QuestionText> {
    const question = await ctx.em
      .getRepository(QuestionText)
      .findOneOrFail({ id });
    question.assign(input);
    await ctx.em.persist(question).flush();
    return question;
  }

  @Mutation(() => Boolean)
  public async deleteQuestionText(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const question = await ctx.em
      .getRepository(QuestionText)
      .findOneOrFail({ id });
    await ctx.em.getRepository(QuestionText).remove(question).flush();
    return true;
  }
}
