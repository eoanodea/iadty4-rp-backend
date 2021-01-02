/**
 * File: index.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Tuesday, 8th December 2020 1:53:12 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Saturday, 2nd January 2021 4:41:57 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import "dotenv/config";
import "reflect-metadata";

import Application from "./application";
(async () => {
  try {
    const application = new Application();
    await application.connect();
    await application.init();
  } catch (err) {
    console.log("❗️ Server Crashed ❗️");
  }
})();
