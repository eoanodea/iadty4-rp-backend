/**
 * File: user.model.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Sunday, 29th November 2020 10:36:37 pm
 * Author: Eoan O'Dea (art@psioniq.uk)
 * -----
 * File Description: Model which represents the User schema
 * Last Modified: Tuesday, 8th December 2020 6:24:42 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

/**
 * Type declaration for User Schema Fields
 */
export interface IUserDocument extends Document {
  _id: string;
  name: string;
  created: Date;
  updated: Date;
  email: string;
  hashed_password: string;
  salt: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  confirmEmailToken: string;
  confirmEmailTokenExpires: string;
  oAuthToken: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * User Schema Methods
 */
export interface IUser extends IUserDocument {
  authenticate(plainText: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(): string;
}

/**
 * Schema for a user
 */
const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  confirmEmailToken: {
    type: String,
  },
  confirmEmailTokenExpires: {
    type: Date,
  },
  oAuthToken: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

/**
 * Encrypt the password
 * And make the salt
 */
UserSchema.virtual("password")
  .set(function (password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Validate the submitted password by the user
 */
UserSchema.path("hashed_password").validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

/**
 * Declaring methods for the User Schema
 */

UserSchema.methods = {
  authenticate(plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword(password: string) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
