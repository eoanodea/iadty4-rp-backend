/**
 * File: jwt.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 28th December 2020 4:39:49 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Wednesday, 17th February 2021 5:21:25 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import config from "../../config";
import jwt from "jsonwebtoken";

/**
 * Verifies a JWT token with the server
 *
 * @param {String} token
 */
export const verifyToken = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, config.jwtSecret);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Generates a JWT token using the
 * users ID and the JWT SECRET
 *
 * @param {String} id
 */
export const generateToken = (id: string) => {
  const date = new Date();
  const expiration = date.setDate(date.getDate() + 7);
  console.log(expiration, typeof expiration);
  return {
    token: jwt.sign(
      {
        _id: id,
      },
      config.jwtSecret,
      {
        expiresIn: "7d",
      }
    ),
    expiration,
  };
};
