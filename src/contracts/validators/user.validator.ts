/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 9:09:09 am
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserValidator {
  @Field()
  @IsString()
  public name: string;

  @Field()
  @IsEmail()
  public email: string;
}
