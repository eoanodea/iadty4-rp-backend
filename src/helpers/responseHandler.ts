/**
 * File: responseHandler.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Sunday, 29th November 2020 11:02:30 pm
 * Author: Eoan O'Dea (art@psioniq.uk)
 * -----
 * File Description: Structures sucess and error responses to the frontend
 * Last Modified: Sunday, 29th November 2020 11:24:35 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import getErrorMessage from "./dbErrorHandler";

/**
 * Sort data for a successful response
 *
 * @param data
 */
export const handleSuccess = (data: any) => {
  return {
    success: true,
    data,
  };
};

/**
 * Sort data for a error response
 *
 * @param error
 */
export const handleError = (error: any) => {
  const errorString =
    typeof error !== "string" ? getErrorMessage(error) : error;

  return {
    success: false,
    error: errorString,
  };
};
