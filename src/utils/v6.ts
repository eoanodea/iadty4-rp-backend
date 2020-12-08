/**
 * File: v6.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:01:43 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Monday, 7th December 2020 10:01:50 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */


import { v1 } from "uuid";
import { randomBytes } from "crypto";

/**
 * This converts v1 UUID to v6 - All this really does is shift the bits around to put the timestamp at the top for better indexing and sorting
 * Makes IDs a bit more semantic and readable, while still giving benefits of UUID
 *
 * Based on the unofficial rfc v6 UUID spec
 *
 * @returns {string} UUID v6
 */
export const v6 = () => {
  const raw = v1();

  const prefix = `${raw.substring(15, 18)}${raw.substring(
    9,
    13
  )}${raw.substring(0, 5)}6${raw.substring(5, 8)}`;
  const prefixFormatted = `${prefix.substr(0, 8)}-${prefix.substr(
    8,
    4
  )}-${prefix.substr(12)}`;

  const random = randomBytes(8).toString("hex");

  return `${prefixFormatted}-${random.substring(0, 4)}-${random.substring(4)}`;
};
