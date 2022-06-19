const router = require("express").Router();
const userController = require("./../controller/userController");
const {
  isNotOpenSession,
  isOpenSession,
} = require("./../middleweare/authMiddleweare");
const UserRegisterValidation = require("./../schema/registerValidateSchema");
const isValid = require("./../middleweare/validationMiddleweare");

router.post("/login", isNotOpenSession, userController.login);
router.get("/auth", userController.getUserInfo);
router.post(
  "/register",
  isNotOpenSession,
  UserRegisterValidation(),
  isValid,
  userController.register
);

router.get("/users", isOpenSession, userController.allUsers);

router.get("/logout", isOpenSession, userController.logout);
module.exports = router;
