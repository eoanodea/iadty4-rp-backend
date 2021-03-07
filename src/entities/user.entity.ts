/**
 * File: user.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:12:23 pm
 * User: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: An Entity which represents a user within the DB
 * Last Modified: Thursday, 25th February 2021 12:56:55 pm
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
import { Field, ObjectType } from "type-graphql";

import { UserValidator } from "../contracts/validators";
import { Question, Base, Lesson, Module } from "./";

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

  @Field()
  @Property()
  public streak: number = 0;

  @Field()
  @Property()
  public level: number = 0;

  @Field()
  @Property()
  public resetPasswordToken: string;

  @Field()
  @Property()
  public resetPasswordExpires: Date;

  @Field(() => [Module])
  @OneToMany(() => Module, (b: Module) => b.user, { cascade: [Cascade.ALL] })
  public completedModules = new Collection<Module>(this);

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
