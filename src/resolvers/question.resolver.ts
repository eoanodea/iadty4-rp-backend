/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 4:23:05 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { QuestionValidator } from "../contracts/validators";
import { Lesson, Note, Question, QuestionText, User } from "../entities";
import { GraphQLResolveInfo } from "graphql";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";
import { ClientSafeError } from "../middleware/errors.middleware";
import { ObjectId } from "bson";
import isEqual from "lodash.isequal";

@Resolver(() => Question)
export class QuestionResolver {
  @Query(() => [Question])
  public async getQuestions(
    @Arg("lesson") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Question[]> {
    return ctx.em.find(Question, { lesson: id }, ["text"]);
  }

  @Query(() => Question, { nullable: true })
  public async getQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Question | null> {
    return ctx.em.getRepository(Question).findOne({ id }, ["text"]);
  }

  @Mutation(() => Question)
  public async addQuestion(
    @Arg("input") input: QuestionValidator,
    @Arg("lessonId") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Question> {
    const question = new Question(input);

    try {
      question.lesson = await ctx.em
        .getRepository(Lesson)
        .findOneOrFail({ id });

      ctx.em.persist(question);

      if (input.text.length > 0) {
        for (const text of input.text) {
          const newQuestionText = new QuestionText(text);

          if (text.note) {
            const note = await ctx.em
              .getRepository(Note)
              .findOneOrFail(text.note);
            newQuestionText.note = note;
          }
          newQuestionText.question = question;
          ctx.em.persist(newQuestionText);
        }
      }

      await ctx.em.flush();

      return question;
    } catch (err) {
      console.log("Error Adding Question", err);
      throw new ClientSafeError(
        "Could not add question",
        500,
        "INTERNAL_SERVER_ERR"
      );
    }
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

  @Mutation(() => Number)
  public async answerQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Arg("answer", { nullable: true }) answer?: string,
    @Arg("answerArr", (type) => [String], { nullable: true })
    answerArr?: [String]
  ): Promise<number> {
    const user = await ctx.em
      .getRepository(User)
      .findOne({ _id: new ObjectId(ctx.auth._id) }, ["incorrectQuestions"]);

    if (user) {
      let isCorrect = false;
      const question = await ctx.em
        .getRepository(Question)
        .findOneOrFail({ id });

      if (
        (answer && isEqual(question.answer, answer)) ||
        (answerArr && isEqual(question.answerArr, answerArr.sort()))
      ) {
        user.points += question.points;
        isCorrect = true;
        user.incorrectQuestions.remove(question);
      } else {
        user.incorrectQuestions.add(question);
      }

      await ctx.em.persist(user).flush();

      return isCorrect ? question.points : 0;
    }
    throw new ClientSafeError("Not Authorized", 401, "AUTH_ERROR");
  }
}
