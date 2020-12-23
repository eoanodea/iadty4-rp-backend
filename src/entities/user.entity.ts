/**
 * File: user.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:12:23 pm
 * User: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 23rd December 2020 6:49:07 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import UserValidator from "../contracts/validators/user.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./base.entity";

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

  @Field()
  @Property()
  public hashed_password: string;

  @Field()
  @Property()
  public salt: string;

  @Field()
  @Property()
  public created: Date;

  //   @Property()
  //   public termsAccepted = false;

  //   @Field({ nullable: true })
  //   @Property({ nullable: true })
  //   public born?: Date;

  //   @Field(() => [Book])
  //   @OneToMany(() => Book, (b: Book) => b.user, { cascade: [Cascade.ALL] })
  //   public books = new Collection<Book>(this);

  //   @Field(() => Book, { nullable: true })
  //   @ManyToOne(() => Book, { nullable: true })
  //   public favouriteBook?: Book;

  constructor(body: UserValidator) {
    super(body);
  }
}
