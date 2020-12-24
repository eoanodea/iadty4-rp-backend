/**
 * File: lesson.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:29:17 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 24th December 2020 2:43:44 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { LessonValidator } from "../contracts/validators";
import { User, Base } from "./";

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
  public user: User;

  //   @Field(() => Publisher, { nullable: true })
  //   @ManyToOne(() => Publisher, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: true })
  //   public publisher?: Publisher;

  //   @Field(() => [Tag])
  //   @ManyToMany(() => Tag)
  //   public tags = new Collection<Tag>(this);

  constructor(body: LessonValidator) {
    super(body);
  }
}
