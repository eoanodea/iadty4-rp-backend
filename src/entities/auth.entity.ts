/**
 * File: auth.entity.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 28th December 2020 1:29:50 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 2nd January 2021 4:51:55 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { User } from "./";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoggedIn {
  @Field()
  user: User;
  @Field()
  token: string;
}
