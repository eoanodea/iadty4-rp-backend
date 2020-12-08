/**
 * File: UUID.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:03:41 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 7th December 2020 10:03:51 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */


import { Type } from "@mikro-orm/core";

/**
 * This is just a stub to allow us to use the UUID extension in postgres with the ORM
 */
export class UUID extends Type {
  getColumnType() {
    return "uuid";
  }
}
