import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { Base, User } from "./";

@ObjectType({ description: "Represents a streak Object" })
@Entity()
export class Streak extends Base<Streak> {
  @Field({
    description: "The number of the current streak, defaults to 0",
    defaultValue: 0,
  })
  @Property()
  public number: number = 0;

  // @Field({
  //   description: "The last date the streak has been updated",
  //   nullable: true,
  // })
  // public lastUpdated: Date;

  @Field(() => User)
  @OneToOne(() => User, (b: User) => b.streak)
  public user: User;

  constructor() {
    super();
  }
}
