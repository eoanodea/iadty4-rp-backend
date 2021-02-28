/**
 * File: book.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:39:05 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 5:25:14 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { NoteValidator } from "../contracts/validators";
import { Question, Note, QuestionText } from "../entities";
import { GraphQLResolveInfo } from "graphql";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../utils/interfaces/context.interface";
import { ClientSafeError } from "middleware/errors.middleware";

import marked from "marked";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";

const dompurify = createDomPurify(new JSDOM().window);

@Resolver(() => Note)
export class NoteResolver {
  @Query(() => [Note])
  public async getNotes(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Note[]> {
    return ctx.em.find(Note, {});
  }

  @Query(() => Note, { nullable: true })
  public async getNote(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Note | null> {
    return ctx.em.getRepository(Note).findOne({ id });
  }

  @Mutation(() => Note)
  public async addNote(
    @Arg("input") input: NoteValidator,
    @Arg("questionText") id: string = "",
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Note> {
    let note = new Note(input);
    if (input.markdown) {
      note.sanitizedHtml = dompurify.sanitize(marked(input.markdown));
    }

    try {
      if (id !== "") {
        note.questionText = await ctx.em
          .getRepository(QuestionText)
          .findOneOrFail({ id });
      }
      await ctx.em.persist(note).flush();

      return note;
    } catch (err) {
      console.log("Error Adding Note", err);
      throw new ClientSafeError(
        "Could not add note",
        500,
        "INTERNAL_SERVER_ERR"
      );
    }
  }

  @Mutation(() => Note)
  public async updateNote(
    @Arg("input") input: NoteValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Note> {
    const note = await ctx.em.getRepository(Note).findOneOrFail({ id });

    if (input.markdown) {
      input.sanitizedHtml = dompurify.sanitize(marked(input.markdown));
    }

    note.assign(input);
    await ctx.em.persist(note).flush();
    return note;
  }

  @Mutation(() => Boolean)
  public async deleteNote(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const note = await ctx.em.getRepository(Note).findOneOrFail({ id });
    await ctx.em.getRepository(Note).remove(note).flush();
    return true;
  }
}
