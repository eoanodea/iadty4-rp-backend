/**
 * File: errors.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 3:31:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Thursday, 24th December 2020 3:38:49 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import config from "../../config";
import { MiddlewareFn } from "type-graphql";

import { MyContext } from "utils/interfaces/context.interface";

/**
 * Error which is marked and formatted to be safe for the client
 */
export class ClientSafeError extends Error {
  code: string;
  status: number;
  data: object;
  constructor(
    message = "Something went wrong, please contact support.",
    status = 500,
    code = "INTERNAL_ERROR"
  ) {
    super(message);
    this.name = "ClientSafeError";
    this.code = code;
    this.status = status;
    this.data = {};
  }
}

/**
 *  This middleware intercepts errors that are thrown and hides them from the user unless the are specifically thrown as clientSafeErrors
 *
 *
 */
export const ErrorInterceptor: MiddlewareFn<MyContext> = async (
  { context, info },
  next
) => {
  return next()
    .catch((err) => {
      // Check if the error is client safe
      const isSafe = err instanceof ClientSafeError;
      if (config.env === "development") console.error(err);

      // Generate or format response to be consistent - we don't want to include the stack trace etc
      const clientError = isSafe
        ? {
            message: err.message,
            code: err.code,
            status: err.status,
            data: err.data,
          }
        : {
            message: "Something went wrong, please contact support.",
            code: "INTERNAL_ERROR",
            status: 500,
            data: {},
          };
      if (!isSafe) console.error(clientError);
      // Attach properly formatted error
      context.res.status(clientError.status).send({ error: clientError });
      // next();
    })
    .catch((err) => {
      // If there is an error with the above - throw it
      throw err;
    });
};
