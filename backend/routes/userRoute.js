import express from "express";
import { authenticateUser, authorizeRoles } from "../controllers/auth.js";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updateUserDetails,
  updateUserPassword,
  updateUserRole,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(authenticateUser, getUserDetails);
router.route("/me/update").put(authenticateUser, updateUserDetails);
router.route("/me/password/update").put(authenticateUser, updateUserPassword);
router
  .route("/admin/users")
  .get(authenticateUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(authenticateUser, authorizeRoles("admin"), getSingleUser)
  .put(authenticateUser, authorizeRoles("admin"), updateUserRole)
  .delete(authenticateUser, authorizeRoles("admin"), deleteUser);

export default router;
