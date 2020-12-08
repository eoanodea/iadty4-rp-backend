/**
 * File: user.controller.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Sunday, 29th November 2020 10:36:29 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Controller for the User Model
 * Last Modified: Monday, 7th December 2020 10:52:33 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import { User } from "../models/User";
import { verify, hash } from "argon2";
import { OrmEntityManger } from "../types/OrmEntityManger";
import { RegisterInput } from "../schemas/inputs/RegisterInput";
import { ClientSafeError } from "../middleware/gql/errors";
// import { sendEmail } from "../utils/email/sendEmail";
// import {
//   BASE_URL,
//   PORT,
//   PASS_RESET_PREFIX,
//   PASS_RESET_EXPIRE,
// } from "../constants";

// import { v4 } from "uuid";
// import { Redis } from 'ioredis';
/**
 *  Verify the Users inputted password against a stored hash
 * @param password - inputted password
 * @param user - User containing hash
 */
export const validatePassword = (password: string, user: User) =>
  new Promise<User>(async (res, rej) => {
    if (password && user && (await verify(user.hash, password))) {
      res(user);
    } else {
      rej();
    }
  });

export const getUserById = (id: string, em: OrmEntityManger) =>
  em.findOneOrFail(User, { id });

export const getUserByEmail = (email: string, em: OrmEntityManger) =>
  em.findOneOrFail(User, { email });

export const createUser = (
  { email, password, firstName, lastName }: RegisterInput,
  em: OrmEntityManger
) =>
  // Turn the password into a hash with argon 2 -> Argon 2 comes with a salt built in
  hash(password)
    .then(
      async (hashedPass): Promise<User> => {
        // Create the User
        const user = em.create(User, {
          email,
          hash: hashedPass,
          firstName,
          lastName,
        });
        // Store the user -> we need to make sure that the user is unique
        await em.persistAndFlush(user);
        return user;
      }
    )
    .catch((err) => {
      // Error handling - if this hits the default case it should log because thats bad
      if (err.detail.match(/already exists\.$/)) {
        throw new ClientSafeError(
          "Sorry, it appears an account with that email already exists",
          400
        );
      }
      console.error(err);
    });

// export const passwordResetRequest = (
//   email: string,
//   em: OrmEntityManger,
//   redis: Redis,
//   claiming = false
// ) => {
//   getUserByEmail(email, em).then(async (user) => {
//     if (user) {
//       const token = v4();
//       const portSuffix = PORT === "80" ? "" : ":" + "8080";
//       await redis.set(
//         PASS_RESET_PREFIX + token,
//         user.id,
//         "ex",
//         PASS_RESET_EXPIRE
//       );
//       sendEmail(
//         email,
//         `<h1>${
//           claiming ? `Welcome to Greenstar Aviation` : `Reset Password`
//         }</h1><a href="http://${BASE_URL}${portSuffix}/pass-reset/${token}">${
//           claiming ? `Claim Account` : `Reset Password`
//         }</a>`
//       );
//     }
//     return true;
//   });
// };

// export const changePassword = (
//   token: string,
//   password: string,
//   em: OrmEntityManger,
//   redis: Redis
// ) => {
//   return redis
//     .get(PASS_RESET_PREFIX + token)
//     .then((userId) => {
//       if (!userId) {
//         throw new ClientSafeError(
//           "Sorry your password reset token has expired",
//           400
//         );
//       }

//       redis.del(config.PASS_RESET_PREFIX + token);
//       return getUserById(userId, em);
//     })
//     .then(async (user) => {
//       // Update password to a hash
//       user.hash = await hash(password);
//       // Flush the update to the database
//       await em.flush();
//       return user;
//     });
// };

// /**
//  * Primary dependencies
//  */
// import { Request, Response, NextFunction } from "express";

// /**
//  * Model Schema
//  */
// import User from "../models/user.model";

// /**
//  * Helpers for sucess and error responses
//  */
// import { handleSuccess, handleError } from "../helpers/responseHandler";
// import RequestMiddleware from "../interfaces/express";

// /**
//  * Create a user in the database
//  *
//  * @param req
//  * @param res
//  */
// export const create = async (req: Request, res: Response) => {
//   try {
//     const user = new User(req.body);

//     const response = await user.save();

//     return res.status(200).json(handleSuccess(response));
//   } catch (err) {
//     return res.status(400).json(handleError(err));
//   }
// };

// /**
//  * Retreive all users from the database
//  *
//  * @param req
//  * @param res
//  */
// export const list = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find({});

//     return res.status(200).json(handleSuccess(users));
//   } catch (err) {
//     return res.status(400).json(handleError(err));
//   }
// };

// /**
//  * Retreive a user by ID from the database
//  *
//  * @param req
//  * @param res
//  */
// export const show = (req: RequestMiddleware, res: Response) => {
//   return res.status(200).json(handleSuccess(req.profile));
// };

// /**
//  * Retreive a user by ID from the database
//  * and append to the req.profile
//  *
//  * @param req
//  * @param res
//  */
// export const userByID = async (
//   req: RequestMiddleware,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id).select("_id name email created");

//     req.profile = user;
//     next();
//   } catch (err) {
//     return res.status(400).json(handleError(err));
//   }
// };

// /**
//  * Update a user by ID
//  *
//  * @param req
//  * @param res
//  */
// export const update = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, req.body, { new: true });

//     return res.status(200).json(handleSuccess(user));
//   } catch (err) {
//     return res.status(400).json(handleError(err));
//   }
// };

// /**
//  * Delete a user by ID
//  *
//  * @param req
//  * @param res
//  */
// export const remove = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const user = await User.deleteOne({ _id: id });

//     return res.status(200).json(handleSuccess(user));
//   } catch (err) {
//     return res.status(400).json(handleError(err));
//   }
// };
