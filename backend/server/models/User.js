import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import validator from "validator"; // Import the validator library
import { correctPassword } from "../utils/method.js";
import { ERRORS } from "../../contants/index.js";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 15,
      required: [true, ERRORS.REQUIRED.FIRSTNAME_REQUIRED],
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 15,
      required: [true, ERRORS.REQUIRED.LASTNAME_REQUIRED],
      validate: [validator.isAlpha, ERRORS.INVALID.INVALID_LASTNAME],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, ERRORS.REQUIRED.EMAIL_REQUIRED],
      validate: [validator.isEmail, ERRORS.INVALID.INVALID_EMAIL],
    },
    password: {
      type: String,
      minlength: [8, ERRORS.INVALID.PASSWORD_LENGTH],
      select: false,
    },
    type: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);
//SCHEMA METHODS
userSchema.methods.correctPassword = correctPassword;

/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (
  firstName,
  lastName,
  email,
  password
  // type
) {
  try {
    const user = await this.create({
      firstName,
      lastName,
      email,
      password,
      // type,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
