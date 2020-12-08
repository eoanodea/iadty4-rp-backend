/**
 * File: user.resolver.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Tuesday, 1st December 2020 8:10:40 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 8th December 2020 2:27:20 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import {
  validatePassword,
  createUser,
  getUserById,
  getUserByEmail,
  // passwordResetRequest,
  // changePassword,
} from "../controllers/user.controller";
import { User } from "../models/User";
import { ApolloContext } from "../types/ApolloContext";
import { authCheck } from "../middleware/gql/auth/authMiddleware";
// import { COOKIE_NAME, ROLE_CACHE_PREFIX, SESSION_EXPIRY } from "../constants";
import { RegisterInput } from "../schemas/inputs/RegisterInput";
import { ClientSafeError } from "../middleware/gql/errors";
// import { roles } from "../data/roles";

@Resolver(User)
export class UserResolver {
  // Get all users -> Delete this for prod
  @Query(() => [User], { nullable: true })
  async users(@Ctx() ctx: ApolloContext): Promise<User[]> {
    return ctx.em.find(User, {}).catch((err) => err);
  }

  // Get The user by their authenticated cookie -> middleware confirms what user it is and puts id into session
  @Query(() => User, { nullable: true })
  @UseMiddleware(authCheck)
  async getSelf(@Ctx() ctx: ApolloContext) {
    return getUserById("ctx.req.session.userId", ctx.em).catch((err) => err);
  }

  // Register a new user
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() ctx: ApolloContext
  ): Promise<User | null> {
    return createUser(input, ctx.em)
      .then((user: any) => {
        // Attach the users authentication to a cookie
        // ctx.req.session.userId = (user && user.id) || null;
        return user;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  // Authenticate and log in user
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: ApolloContext
  ): Promise<User | null> {
    return getUserByEmail(email, ctx.em)
      .then((user) => validatePassword(password, user))
      .then(async (user) => {
        // Attach the users authentication to a cookie
        // ctx.req.session.userId = user.id;
        // await ctx.redis.set(
        //   ROLE_CACHE_PREFIX + user.id,
        //   user.role,
        //   "ex",
        //   SESSION_EXPIRY
        // );
        return user;
      })
      .catch((err) => {
        throw new ClientSafeError(
          err || "Incorrect Password",
          403,
          "AUTH_ERROR"
        );
      });
  }

  // Logout user and remove cookie
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ApolloContext): Promise<boolean> {
    return new Promise((resolve, rej) =>
      // Destroy the session in redis
      // ctx.req.session.destroy((err) => {
      //   // Clear the cookie from the response
      //   ctx.res.clearCookie(COOKIE_NAME);
      //   if (err) {
      //     // If this happens it means the user was probably not logged in when they logged out somehow
      //     console.error(`Cant log out!`);
      //     return rej(false);
      //   } else {
      //     resolve(true);
      //   }
      // })
      console.log("yes")
    );
  }

  // Send an email with a password request token
  // @Mutation(() => Boolean)
  // async forgotPassword(@Arg("email") email: string, @Ctx() ctx: ApolloContext) {
  //   passwordResetRequest(email, ctx.em, ctx.redis);
  //   return true;
  // }

  // Use a token to change the password
  // @Mutation(() => User)
  // async changePassword(
  //   @Arg("token") token: string,
  //   @Arg("password") password: string,
  //   @Ctx() ctx: ApolloContext
  // ): Promise<User> {
  //   return changePassword(token, password, ctx.em, ctx.redis);
  // }

  /**
   *  Format what comes back from the database into
   * @param user
   */
  // @FieldResolver()
  // role(@Root() user: User) {
  //   // Default role to guest if not found to be safe
  //   return { id: user.role, name: roles[user.role || 6] };
  // }
}

// import UserModel from "../models/user.model";

// import { ObjectType, Field, ID } from "type-graphql";
// import { prop as Property, getModelForClass } from "@typegoose/typegoose";

// // @ObjectType({ description: "The User model" })
// // export class User {
// //   @Field(() => ID)
// //   id: number;

// //   @Field()
// //   @Property({ required: true })
// //   name: String;

// //   @Field()
// //   @Property({ required: true })
// //   email: String;

// //   // @Field(_type => String)
// //   // @Property({ ref: Cart, required: true})
// //   // cart_id: Ref<Cart>
// // }

// // export const UserModel = getModelForClass(User);

// export default {
//   Query: {
//     /**
//      * Retreive a user by ID from the databaseand
//      * and append to the response
//      */
//     getUser: (root: any, { id }: any) => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const user = await User.findById(id).select("_id name email created");
//           resolve(user);
//         } catch (err) {
//           reject(err);
//         }
//       });
//     },
//   },
//   Mutation: {
//     /**
//      * Create a user in the database
//      */
//     createUser: (root: any, { input }: any) => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const user = new User(input);

//           const response = await user.save();

//           resolve(response);
//         } catch (err) {
//           reject(err);
//         }
//       });
//     },
//     /**
//      * update a user in the database
//      */
//     updateUser: (root: any, { input }: any) => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const user = await User.findByIdAndUpdate(input.id, input, {
//             new: true,
//           });

//           resolve(user);
//         } catch (err) {
//           reject(err);
//         }
//       });
//     },
//     /**
//      * Delete a user by ID
//      */
//     deleteUser: (root: any, { id }: any) => {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const user = await User.deleteOne({ _id: id });

//           resolve("Deleted Successfully");
//         } catch (err) {
//           reject(err);
//         }
//       });
//     },
//   },
// };
