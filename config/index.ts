import dotenv from "dotenv";
/**
 * Init dotenv
 */
dotenv.config();

/**
 * Get environment varibles from the .env file
 * and allow them to be accessed during runtime
 */
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || "",
};

export default config;
