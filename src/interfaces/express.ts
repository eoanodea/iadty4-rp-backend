/**
 * File: express.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Sunday, 29th November 2020 11:03:55 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Interfaces which extend the request middleware
 * Last Modified: Sunday, 29th November 2020 11:24:10 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { Request } from "express";
import { IUserDocument } from "../models/user.model";

/**
 * Extending Request to contain middleware
 */
export default interface RequestMiddleware extends Request {
  profile?: IUserDocument;
  auth?: IUserDocument;
}
