/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 12:19:35 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserValidator {
  @Field()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: "Password must be at least 6 characters",
  })
  public password: string;
}

// @InputType()
// export class UpdateUserValidator {
//   @Field()
//   @IsString()
//   public name: string;

//   @Field()
//   @IsEmail()
//   public email: string;

//   @IsString()
//   @MinLength(6, {
//     message: "Password must be at least 6 characters",
//   })
//   public password: string;
// }
