/**
 * File: notes.entity.ts
 * Project: music-theory-backend
 * Version 1.0.1
 * File Created: Wednesday, 24th February 2021 3:39:24 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 10:54:04 am
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { Entity, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { Base } from "./";
import { NoteValidator } from "contracts/validators/note.validator";
import { QuestionText } from "./questionText.entity";

@ObjectType({ description: "Represents a note within the database" })
@Entity()
export class Note extends Base<Note> {
  @Field()
  @Property()
  public title: string;

  @Field()
  @Property()
  public markdown: string;

  @Field()
  @Property()
  public sanitizedHtml: string;

  @Field(() => QuestionText, { nullable: true })
  @OneToOne(() => QuestionText, (b: QuestionText) => b.note, { nullable: true })
  public questionText: QuestionText;

  constructor(body: NoteValidator) {
    super(body);
  }
}
