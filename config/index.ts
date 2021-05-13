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
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET,
  jwtAdminSecret: process.env.JWT_ADMIN_SECRET,
  SESSION_TTL: process.env.SESSION_TTL,
};

export default config;
