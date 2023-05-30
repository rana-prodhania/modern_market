import createError from "http-errors";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendJWTToken from "../utils/jwtToken.js";
import { successHandler, notFoundHandler } from "../utils/responseHandler.js";

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
  res.clearCookie("token", {
    httpOnly: true,
  });
  successHandler(res, 200, "Logout successful");
});

// Get user details
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  successHandler(res, 200, "User details", user);
});

// Update user details
const updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;
  const newUserData = { name, email };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  successHandler(res, 200, "User details updated", user);
});

// Update user password
const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatch = await user.matchPassword(oldPassword);
  if (!isPasswordMatch) {
    return next(createError(400, "Old password is incorrect"));
  }
  user.password = newPassword;
  await user.save();
  sendJWTToken(res, 200, "Password updated", user);
});

// Get all users - admin only
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  successHandler(res, 200, "Users", users);
});

// Get a Single user - admin only
const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  notFoundHandler(user, "User not found");
  successHandler(res, 200, "User", user);
});

// Update user role - admin only
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { name, email, role } = req.body;
  const newUserData = { name, email, role };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  notFoundHandler(user, "User not found");
  successHandler(res, 200, "User role updated", user);
});

// Delete user - admin only
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  notFoundHandler(user, "User not found");
  successHandler(res, 200, "User deleted", user);
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
