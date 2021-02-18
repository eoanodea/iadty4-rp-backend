/**
 * File: lesson.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:29:17 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 18th February 2021 10:23:36 am
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { QuestionType } from "../contracts/validators/enums/questionType.enum";
import { Field, ObjectType } from "type-graphql";

import { QuestionValidator } from "../contracts/validators";
import { Lesson, Base, User } from "./";

@ObjectType({ description: "Represents a question within the database" })
@Entity()
export class Question extends Base<Question> {
  @Field()
  @Property()
  public requiresPiano: boolean;

  @Field()
  @Property()
  public text: string;

  @Field(() => QuestionType)
  @Enum(() => QuestionType)
  public type: QuestionType;

  @Field(() => [String], { nullable: true })
  @Property()
  public options: string[];

  @Field({ nullable: true })
  @Property()
  public image?: string;

  @Field({ nullable: true })
  @Property()
  public answer?: string;

  @Field(() => [String], { nullable: true })
  @Property()
  public answerArr?: string[] | null;

  @Field({ nullable: true })
  @Property()
  public answerHint?: string;

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
