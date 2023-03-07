const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPasswordToken,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUsers,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticatedUser, getUserDetail);

router.route("/password/forgot").post(forgotPassword);

router.route("/resetPassword/:token").put(resetPasswordToken);

router.route("/logout").get(logout);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUsers)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
