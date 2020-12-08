/**
 * File: validateGoogleLogin.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Sunday, 29th November 2020 11:04:16 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Validates logins from Google
 * Last Modified: Tuesday, 8th December 2020 2:30:51 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

/**
 * Importing environment variables
 */
// import config from "../config";

// /**
//  * Google oAuth Import & Initialization
//  */
// import { OAuth2Client } from "google-auth-library";

// /**
//  * Whatever device the login with google
//  * request came from, return the associated
//  * google oAuth client id
//  *
//  * @param {string} type
//  */
// const getAudienceFromType = (type: string) => {
//   switch (type) {
//     case "ios":
//       return config.env === "development"
//         ? config.dev_ios_google_client_id
//         : config.prod_ios_google_client_id;
//     case "android":
//       return config.dev_android_google_client_id;
//     default:
//       return config.google_client_id;
//   }
// };

// /**
//  * Verify the Google JWT token sent from the frontend
//  *
//  * @param {Request} req
//  * @param {Response} res
//  */
// export const loginWithGoogle = (
//   type: string,
//   token: string,
//   accessToken: string = null
// ) => {
//   return new Promise(async (resolve, reject) => {
//     /**
//      * Get the config variable depending on the request type
//      *
//      * -ios
//      * -android
//      * -web
//      */
//     const audience = getAudienceFromType(type);

//     /**
//      * Initialize the oAuth client with the config variable
//      */
//     const client = new OAuth2Client(audience);

//     try {
//       /**
//        * Verify the token created in the frotnend
//        * with Google, along with our client ID
//        */
//       const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience,
//       });

//       /**
//        * Get the payload from the verified ticket
//        */
//       const payload = ticket.getPayload();

//       /**
//        * Create a user object from
//        * the ticket payload
//        */
//       const user: any = {
//         name: payload.name,
//         email: payload.email,
//         oAuthToken: payload.sub,
//       };

//       /**
//        * For iOS & Android only
//        * If the user has a access token, store it in the DB
//        */
//       if (accessToken) user.accessToken = accessToken;

//       resolve(user);
//     } catch (err) {
//       console.log("error autenticating with Google!", err);
//       reject(err);
//     }
//   });
// };
