/**
 * File: user.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:12:23 pm
 * User: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: An Entity which represents a user within the DB
 * Last Modified: Tuesday, 29th December 2020 3:12:00 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import { UserValidator } from "../contracts/validators";
import { Field, ObjectType } from "type-graphql";
import { Question, Base, Lesson } from "./";

@ObjectType()
@Entity()
export class User extends Base<User> {
  @Field()
  @Property()
  @Unique()
  public name: string;

  @Field()
  @Property()
  @Unique()
  public email: string;

  @Property()
  password: string;

  @Field(() => [Lesson])
  @OneToMany(() => Lesson, (b: Lesson) => b.user, { cascade: [Cascade.ALL] })
  public completedLessons = new Collection<Lesson>(this);

  @Field(() => [Question])
  @OneToMany(() => Question, (b: Question) => b.user, {
    cascade: [Cascade.ALL],
  })
  public incorrectQuestions = new Collection<Question>(this);

  constructor(body: UserValidator) {
    super(body);
  }
}
