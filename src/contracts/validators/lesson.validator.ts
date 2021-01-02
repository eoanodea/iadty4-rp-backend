/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 2nd January 2021 2:08:31 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { IsEnum, IsNumber, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import { LessonType } from "./enums/lessonType.enum";

@InputType()
export class LessonValidator {
  @Field()
  @IsString()
  public title: string;

  @Field()
  @IsNumber()
  public level: number;

  @Field(() => LessonType)
  @IsEnum(LessonType)
  public type: LessonType;
}
