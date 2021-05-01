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
import { QuestionType } from "contracts/validators/enums/questionType.enum";

import { promises as fs } from "fs";
import { wrap } from "@mikro-orm/core";

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

  @Query(() => [String])
  public async getQuestionTypes(): Promise<string[]> {
    return Object.values(QuestionType);
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
      if (input.image && input.image !== "") {
        const type = input.image.includes("jpeg") ? "jpeg" : "png";
        const base64Image = input.image.replace(
          /^(data:image)\/(\bpng|\bjpeg);base64,/,
          ""
        );
        const imageName = `${Math.floor(Date.now() / 1000)}.${type}`;

        await fs.writeFile(
          `${process.cwd()}/assets/images/${imageName}`,
          base64Image,
          "base64"
        );
        question.image = imageName;
      }
      question.lesson = await ctx.em
        .getRepository(Lesson)
        .findOneOrFail({ id });

      ctx.em.persist(question);

      if (input.text.length > 0) {
        for (const text of input.text) {
          const newQuestionText = new QuestionText({
            text: text.text,
            order: text.order,
          });

          if (text.note) {
            const note = await ctx.em
              .getRepository(Note)
              .findOneOrFail(text.note);
            newQuestionText.note = note;
            console.log("attaching note!", newQuestionText);
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

    if (input.image) {
      if (question.image) {
        await fs.unlink(`${process.cwd()}/assets/images/${question.image}`);
      }
      const type = input.image.includes("jpeg") ? "jpeg" : "png";
      const base64Image = input.image.replace(
        /^(data:image)\/(\bpng|\bjpeg);base64,/,
        ""
      );
      const imageName = `${Math.floor(Date.now() / 1000)}.${type}`;

      await fs.writeFile(
        `${process.cwd()}/assets/images/${imageName}`,
        base64Image,
        "base64"
      );
      input.image = imageName;
    }

    wrap(question).assign(input, { em: ctx.em });

    await ctx.em.persist(question).flush();
    return question;
  }

  @Mutation(() => Boolean)
  public async deleteQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const question = await ctx.em.getRepository(Question).findOneOrFail({ id });
    if (question.image) {
      await fs.unlink(`${process.cwd()}/assets/images/${question.image}`);
    }
    if (question.text.length > 0) {
      for (const text of question.text) {
        const questionText = await ctx.em
          .getRepository(QuestionText)
          .findOneOrFail({ id: text.id });
        await ctx.em.getRepository(QuestionText).remove(questionText).flush();
      }
    }
    await ctx.em.getRepository(Question).remove(question).flush();
    return true;
  }

  @Mutation(() => Number)
  public async answerQuestion(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Arg("answer", { nullable: true }) answer?: string,
    @Arg("answerArr", (type) => [String], { nullable: true })
    answerArr?: string[]
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
        (answerArr &&
          answerArr.length > 0 &&
          isEqual(question.answerArr.sort(), answerArr.sort()))
      ) {
        user.points += question.points;
        isCorrect = true;
        user.incorrectQuestions.remove(question);
      } else {
        user.incorrectQuestions.add(question);
      }
      console.log("points: ", isCorrect ? question.points : 0);

      await ctx.em.persist(user).flush();

      return isCorrect ? question.points : 0;
    }
    throw new ClientSafeError("Not Authorized", 401, "AUTH_ERROR");
  }
}
