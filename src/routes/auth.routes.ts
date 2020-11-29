/**
 * File: auth.routes.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Sunday, 29th November 2020 11:22:52 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description: Routes for authentication
 * Last Modified: Sunday, 29th November 2020 11:23:24 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import express from "express";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/api/auth";

/**
 * @method POST - Signs in a user
 */
router.route(`${prefix}/signin`).post(authCtrl.signin);

/**
 * @method GET - Signs out a user
 */
router
  .route(`${prefix}/signout/:accessToken?`)
  .get(authCtrl.requireSignin, authCtrl.signout);

/**
 * @method GET - Get a user by their token
 */
router.route(`${prefix}/user`).get(authCtrl.requireSignin, authCtrl.getUser);

/**
 * @method POST - Verify a login with a third party
 */
router
  .route(`${prefix}/signin/:provider/:type`)
  .post(authCtrl.loginWithThirdParty);

export default router;
