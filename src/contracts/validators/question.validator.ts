/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 29th December 2020 3:06:32 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { IsBoolean, IsEnum, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import { QuestionType } from "./enums/questionType.enum";

@InputType()
export class QuestionValidator {
  @Field()
  @IsBoolean()
  public requiresPiano: string;

  @Field()
  @IsString()
  public text: string;

  @Field()
  @IsString()
  public answer: string;

  @Field(() => QuestionType)
  @IsEnum(() => QuestionType)
  public type: QuestionType;
}
