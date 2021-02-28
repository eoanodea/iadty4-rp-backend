/**
 * File: auth.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 28th December 2020 12:25:25 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 24th February 2021 3:44:25 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NoteValidator {
  @Field()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  public markdown: string;

  @Field({ nullable: true })
  @IsOptional()
  public sanitizedHtml: string;
}
