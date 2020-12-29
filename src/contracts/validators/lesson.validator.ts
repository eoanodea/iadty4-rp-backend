/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 29th December 2020 4:15:11 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { IsNumber, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LessonValidator {
  @Field()
  @IsString()
  public title: string;

  @Field()
  @IsNumber()
  public level: number;
}
