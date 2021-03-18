/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 25th February 2021 9:12:08 am
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { ObjectId } from "@mikro-orm/mongodb";
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Note, Question } from "entities";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Validator for QuestionText" })
export class QuestionTextValidator {
  @Field({
    description:
      "The order of where the question text will appear (starting at 0)",
  })
  @IsNumber()
  public order: number;

  @Field({ description: "The text of the question text" })
  @IsString()
  public text: string;

  @Field({
    description:
      "The ID of the Note this text is associated with, if not provided the text will default to be not a link",
    nullable: true,
  })
  @IsString()
  @IsOptional()
  public note?: string;
}
