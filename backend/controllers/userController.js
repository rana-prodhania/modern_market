import createError from "http-errors";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import { successHandler } from "../utils/responseHandler.js";

// Register a new user
const registerUser = catchAsyncErrors(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.generateJWTToken();
  successHandler(res, 201, "User created successfully", { user, token });
});

// login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, "Please enter your email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(createError(400, "Invalid email or password"));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(createError(400, "Invalid email or password!"));
  }

  const token = user.generateJWTToken();

  successHandler(res, 200, "Login successful", { user, token });
});

export { registerUser, loginUser };
