/**
 * File: express.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 26th October 2020 5:49:34 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Initialize and run the Express Server
 * Last Modified: Sunday, 29th November 2020 11:35:12 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

/**
 * Import primary dependencies
 */
import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";

/**
 * Import Routes
 */
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { ErrorCode } from "express-jwt";

/**
 * Declare express app
 */
const app: Application = express();

/**
 * Get the current working directory
 */
const CURRENT_WORKING_DIR = process.cwd();

/**
 * parse body params and attache them to req.body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

/**
 * Secure apps by setting various HTTP headers
 */
app.use(helmet());

/**
 * enable CORS - Cross Origin Resource Sharing
 */
app.use(cors());

/**
 * Compile to dist directory
 */
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

/**
 * Mount Routes
 *
 */
app.use("/", userRoutes);
app.use("/", authRoutes);

/**
 * Catch Unauthorized Errors
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    return res
      .status(401)
      .json({ success: false, error: err.name + ": " + err.message });
  }
});

export default app;
