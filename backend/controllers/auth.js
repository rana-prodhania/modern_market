import createError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(createError(401, "You are not an authenticated user"));
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);
  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError(403, `You are not authorized to perform this action`)
      );
    }
    next();
  };
};

export { authenticateUser, authorizeRoles };
