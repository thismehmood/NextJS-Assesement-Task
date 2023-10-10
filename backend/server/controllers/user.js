// utils
import makeValidation from "@withvoid/make-validation";
// models
import UserModel from "../models/User.js";
import UploadModel from "../models/Upload.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ERRORS,
  SUCCESS_MESSAGES,
  STATUS,
  STATUS_CODE,
} from "../../contants/index.js";

async function onCreateDocument(req, res) {
  try {
    const { carModel, price, Phone, City, Copies } = req.body;

    // Check if any of the required fields are missing
    if (!carModel || !price || !Phone || !City || !Copies) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        status: STATUS.ERROR,
        message: "All fields are mandatory.",
      });
    }

    const images = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
    }));

    const document = await UploadModel.create({
      carModel,
      price,
      Phone,
      City,
      Copies,
      images,
    });
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS.SUCCESS,
      message: SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
      result: document,
    });
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      status: STATUS.ERROR,
      message: error.message,
    });
  }
}
async function onCreateUser(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isEmail = await UserModel.findOne({ email });
    if (isEmail) {
      return next(
        new AppError(
          "Email Already Exists with this Name",
          STATUS_CODE.BAD_REQUEST
        )
      );
    }

    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        firstName: { type: types.string },
        lastName: { type: types.string },
        email: { type: types.string },
        password: { type: types.string },
      },
    }));
    if (!validation.success)
      return res.status(STATUS_CODE.BAD_REQUEST).json({ ...validation });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.createUser(
      firstName,
      lastName,
      email,
      encryptedPassword
    );
    return res.status(STATUS_CODE.OK).json({
      status: STATUS.SUCCESS,
      message: SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
      result: user,
    });
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      status: STATUS.ERROR,
      message: error.message,
    });
  }
}

async function onLoginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // checking email or password empty?
      return next(
        new AppError(
          ERRORS.INVALID.NO_CREDENTIALS_EMAIL,
          STATUS_CODE.BAD_REQUEST
        )
      );
    }
    // Finding user by email
    const user = await UserModel.findOne({ email }).select("+password");
    // if user exits
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
        }
      );
      //save token
      user.token = token;
      return res.status(STATUS_CODE.OK).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
        token,
        result: user,
      });
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        status: STATUS_CODE.BAD_REQUEST,
        message: ERRORS.INVALID.INVALID_PASSWORD,
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      status: STATUS.ERROR,
      message: error.message,
    });
  }
}
export default {
  onCreateDocument,
  onCreateUser,
  onLoginUser,
};
