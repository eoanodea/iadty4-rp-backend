/**
 * File: errors.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Thursday, 24th December 2020 3:31:58 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 28th December 2020 10:45:19 am
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
      const isSafe = config.env === "development";
      //err instanceof ClientSafeError;
      if (config.env === "development") console.error("hello", err);

      let data =
        err.message === "Argument Validation Error"
          ? err.validationErrors
          : err.data;

      // Generate or format response to be consistent - we don't want to include the stack trace etc
      const error = safeErrorMessage(err, data);

      if (!isSafe) console.error(error);

      // Attach properly formatted error
      return context.res.status(error.status).send(error);
    })
    .catch((err) => {
      // If there is an error with the above - throw it
      console.log("error!!!!", err);
      throw err;
    });
};

export const safeErrorMessage = (
  err: {
    code?: number;
    message?: string;
    status?: any;
  },
  data?: any
) => {
  let response = {
    status: 500,
    message: "Something went wrong, please contact support.",
    code: "INTERNAL_ERROR",
  };

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        response.message = getUniqueErrorMessage(err);
        response.status = 400;
        response.code = "BAD_REQUEST";
        break;
    }
  } else if (err.message === "Argument Validation Error") {
    response.message = Object.values(data[0].constraints)[0] as string;
    response.status = 422;
    response.code = "UNPROCESSABLE_ENTITY";
  } else if (err.message.includes("Validator")) {
    response.message = err.message.split(".")[1] as string;
    response.status = 422;
    response.code = "UNPROCESSABLE_ENTITY";
  }

  return response;
};

/**
 * Generates a safe error message for the client
 * Removing table names and stack traces
 *
 * @param err - An error object
 *
 * @returns {String} - Safe error message
 */
const getUniqueErrorMessage = (err) => {
  let output;

  try {
    const obj = err.keyValue;
    const arr = Object.entries(obj);

    const msg = `${arr.map((dat) => dat)} already exists`;

    output = msg.replace(",", " ");
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};
