/**
 * File: lesson.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 2:29:17 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 11th January 2021 3:01:49 pm
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
import { ModuleType } from "../contracts/validators/enums/moduleType.enum";

import { Field, ObjectType } from "type-graphql";

import { ModuleValidator } from "../contracts/validators";
import { User, Base } from "./";
import { Lesson } from "./lesson.entity";

@ObjectType()
@Entity()
export class Module extends Base<Module> {
  @Field()
  @Property()
  public title: string;

  @Field()
  @Property()
  public level: number;

  @Field(() => ModuleType)
  @Enum(() => ModuleType)
  public type: ModuleType;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "restrict" })
  public user?: User;

  @Field(() => [Lesson])
  @OneToMany(() => Lesson, (b: Lesson) => b.module)
  public lessons = new Collection<Lesson>(this);

  constructor(body: ModuleValidator) {
    super(body);
  }
}
