/**
 * File: dbErrorHandler.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Sunday, 29th November 2020 11:02:26 pm
 * Author: Eoan O'Dea (art@psioniq.uk)
 * -----
 * File Description: Removing sensitive information from DB errors and transforming them into a somewhat readable message
 * Last Modified: Sunday, 29th November 2020 11:24:18 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

"use strict";

/**
 * Get unique error field name
 */
const getUniqueErrorMessage = (err: any) => {
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

/**
 * Get the error message from error object
 */
const getErrorMessage = (err: any) => {
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        return getUniqueErrorMessage(err);
      default:
        return "Something went wrong";
    }
  }

  if (err.message) return err.message;

  for (const errName in err.errors) {
    if (err.errors[errName].message) return err.errors[errName].message;
  }
};

export default getErrorMessage;
