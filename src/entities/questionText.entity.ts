/**
 * File: questionText.entity.ts
 * Project: music-theory-backend
 * Version 1.0.1
 * File Created: Wednesday, 24th February 2021 3:52:30 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 1:51:22 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { Entity, ManyToOne, OneToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { Base, Note, Question } from "./";
import { QuestionTextValidator } from "../contracts/validators";

@ObjectType()
@Entity()
export class QuestionText extends Base<QuestionText> {
  @Field()
  @Property()
  public order: number;

  @Field()
  @Property()
  public text: string;

  @Field(() => Note, { nullable: true })
  @OneToOne({ entity: () => Note, nullable: true })
  public note?: Note;

  @Field(() => Question)
  @ManyToOne(() => Question, { onDelete: "cascade" })
  public question: Question;

  constructor(body: QuestionTextValidator) {
    super(body);
  }
}
