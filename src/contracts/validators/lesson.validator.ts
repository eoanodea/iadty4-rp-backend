/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 12th January 2021 4:42:56 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { IsEnum, IsNumber, IsString } from "class-validator";
import { Module } from "entities";
import { Field, InputType } from "type-graphql";
import { ModuleType } from "./enums/moduleType.enum";

@InputType()
export class LessonValidator {
  @Field()
  @IsNumber()
  public level: number;
}
