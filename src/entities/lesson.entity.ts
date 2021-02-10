/**
 * File: lesson.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:29:17 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 13th January 2021 2:47:40 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";

import { Field, ObjectType } from "type-graphql";

import { LessonValidator } from "../contracts/validators";
import { Base, Question, User } from "./";
import { Module } from "./module.entity";

@ObjectType()
@Entity()
export class Lesson extends Base<Lesson> {
  @Field(() => Module)
  @ManyToOne(() => Module, { onDelete: "cascade" })
  public module: Module;

  @Field()
  @Property()
  public level: number;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "restrict" })
  public user?: User;

  @Field(() => [Question])
  @OneToMany(() => Question, (b: Question) => b.lesson)
  public questions? = new Collection<Question>(this);

  constructor(body: LessonValidator) {
    super(body);
  }
}
