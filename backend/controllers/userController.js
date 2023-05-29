import createError from "http-errors";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendJWTToken from "../utils/jwtToken.js";
import { successHandler } from "../utils/responseHandler.js";

// Register a new user
const registerUser = catchAsyncErrors(async (req, res) => {
  const newUser = await User.create(req.body);
  sendJWTToken(res, 201, "Register successful", newUser);
});

// login user
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, "Please enter your email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(createError(400, "Invalid email or password"));
  }

  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    return next(createError(400, "Invalid email or password!"));
  }

  sendJWTToken(res, 200, "login successful", user);
});

// logout user
const logoutUser = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  successHandler(res, 200, "Logout successful");
});

export { registerUser, loginUser, logoutUser };
