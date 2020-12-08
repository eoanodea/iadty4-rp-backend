/**
 * File: index.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 26th October 2020 5:46:07 pm
 * Author: Eoan O'Dea (art@psioniq.uk)
 * -----
 * File Description: Entry point for the application, imports express and connects to the database
 * Last Modified: Tuesday, 8th December 2020 2:34:07 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

// import app from "./express";
// import mongoose from "mongoose";
// import config from "./config";

// /**
//  * Mongoose Connection configurations
//  */
// const options = {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// };

// /**
//  * Creates a global mongoose promise
//  */
// mongoose.Promise = global.Promise;

// /**
//  * Connect using the config mongoURI and options
//  */
// mongoose.connect(config.MONGO_URI, options);

// /**
//  * Listen for an error
//  */
// mongoose.connection.on("error", () => {
//   throw new Error(`unable to connect to database: ${config.MONGO_URI}`);
// });

// /**
//  * Listen on the specified port, and for any errors
//  */
// app
//   .listen(config.PORT, () => {
//     console.info("Server started on port %s.", config.PORT);
//   })
//   .on("error", (err: any) => {
//     console.error("Server Error: ", err);
//   });
