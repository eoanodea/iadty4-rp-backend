/**
 * File: lesson.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:29:17 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 2nd January 2021 4:54:20 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { QuestionType } from "../contracts/validators/enums/questionType.enum";
import { Field, ObjectType } from "type-graphql";

import { QuestionValidator } from "../contracts/validators";
import { Lesson, Base, User } from "./";

@ObjectType()
@Entity()
export class Question extends Base<Question> {
  @Field()
  @Property()
  public requiresPiano: boolean;

  @Field()
  @Property()
  public text: string;

  @Field()
  @Property()
  public answer: string;

  @Field(() => QuestionType)
  @Enum(() => QuestionType)
  public type: QuestionType;

  @Field(() => Lesson)
  @ManyToOne(() => Lesson, { onDelete: "cascade" })
  public lesson: Lesson;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "restrict" })
  public user: User;

  constructor(body: QuestionValidator) {
    super(body);
  }
}
