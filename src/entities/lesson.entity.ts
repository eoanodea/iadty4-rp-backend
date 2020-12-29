/**
 * File: lesson.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:29:17 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 29th December 2020 3:34:12 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";

import { Field, ObjectType } from "type-graphql";

import { LessonValidator } from "../contracts/validators";
import { User, Base, Question } from "./";

@ObjectType()
@Entity()
export class Lesson extends Base<Lesson> {
  @Field()
  @Property()
  public title: string;

  @Field()
  @Property()
  public level: number;

  @Field()
  @Property()
  public answer: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "restrict" })
  public user?: User;

  @Field(() => [Question])
  @OneToMany(() => Question, (b: Question) => b.lesson)
  public questions = new Collection<Question>(this);

  constructor(body: LessonValidator) {
    super(body);
  }
}
