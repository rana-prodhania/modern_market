import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import { successHandler } from "../utils/responseHandler.js";

// register a new user
const createUser = catchAsyncErrors(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.getJWTToken();
  successHandler(res, 201, "Product created successfully", { user, token });
});

export { createUser };
