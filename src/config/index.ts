/**
 * File: index.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 26th October 2020 5:46:54 pm
 * Author: Eoan O'Dea (art@psioniq.uk)
 * -----
 * File Description:
 * Last Modified: Monday, 7th December 2020 10:34:53 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import dotenv from "dotenv";
/**
 * Init dotenv
 */
dotenv.config();

// hello

/**
 * Get environment varibles from the .env file
 * and allow them to be accessed during runtime
 */

const config = {
  env: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  BASE_URL: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_TTL: process.env.SESSION_TTL,

  PASS_RESET_PREFIX: "pass-reset:",
  PASS_RESET_EXPIRE: 1000 * 60 * 30, // 30 mins

  // PASS_RESET_PREFIX,
  // PASS_RESET_EXPIRE,
  // google_client_id: process.env.GOOGLE_CLIENT_ID,
  // prod_ios_google_client_id: process.env.PROD_IOS_GOOGLE_CLIENT_ID,
  // dev_ios_google_client_id: process.env.DEV_IOS_GOOGLE_CLIENT_ID,
  // dev_android_google_client_id: process.env.DEV_ANDROID_GOOGLE_CLIENT_ID,
  // prod_android_google_client_id: process.env.PROD_ANDROID_GOOGLE_CLIENT_ID,
  // apple_private_key: process.env.APPLE_PRIVATE_KEY,
  // apple_key_id: process.env.APPLE_KEY_ID,
  // apple_team_id: process.env.APPLE_TEAM_ID,
  // apple_bundle_id: process.env.APPLE_BUNDLE_ID,
};

export default config;
