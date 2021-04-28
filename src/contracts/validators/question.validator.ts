/**
 * File: user.validator.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Wednesday, 23rd December 2020 6:19:21 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 24th February 2021 4:50:10 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { Field, InputType } from "type-graphql";
import { QuestionType } from "./enums/questionType.enum";
import { QuestionTextValidator } from "./questionText.validator";

@InputType()
export class QuestionValidator {
  @Field({ defaultValue: false })
  @IsBoolean()
  public requiresPiano: boolean = false;

  @Field(() => [QuestionTextValidator], { nullable: true })
  @IsOptional()
  @IsArray()
  // @Type(() => QuestionTextValidator)
  public text: QuestionTextValidator[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public image?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public options: string[];

  @Field()
  @IsEnum(QuestionType)
  public type: QuestionType;

  @Field()
  @IsNumber()
  public points?: number;

  @Field({ nullable: true })
  @ValidateIf((o) => o.type === QuestionType.TEXT)
  @IsString()
  public answer?: string;

  @Field(() => [String], { nullable: true })
  @ValidateIf((o) => o.type === QuestionType.MULTIPLE_CHOICE)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public answerArr?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public answerHint?: string;
}
