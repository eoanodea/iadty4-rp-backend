/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 11th January 2021 3:01:24 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { IsEnum, IsNumber, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ModuleType } from "./enums/moduleType.enum";

@InputType()
export class ModuleValidator {
  @Field()
  @IsString()
  public title: string;

  @Field()
  @IsNumber()
  public level: number;

  @Field(() => ModuleType)
  @IsEnum(ModuleType)
  public type: ModuleType;
}
