/**
 * File: base.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:04:14 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Base entity for all entities
 * Last Modified: Wednesday, 23rd December 2020 6:24:19 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  BaseEntity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "@mikro-orm/mongodb";

@ObjectType({ isAbstract: true })
export class Base<T extends { id: string }> extends BaseEntity<T, "id"> {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Field()
  @Property()
  public createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  constructor(body = {}) {
    super();
    this.assign(body);
  }
}
