import { Entity, ManyToOne, OneToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { Base, Question } from "./";

@ObjectType({ description: "Represents an image within the database" })
@Entity()
export class Image extends Base<Image> {
  @Field()
  @Property()
  public data: string;

  @Field()
  @Property()
  public name: string;

  @Field()
  @Property()
  public type: string;

  @Field(() => Question)
  @OneToOne(() => Question)
  public question: Question;

  constructor(body: any) {
    super(body);
  }
}
