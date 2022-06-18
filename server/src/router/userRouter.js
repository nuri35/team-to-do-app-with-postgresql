const router = require("express").Router();
const userController = require("./../controller/userController");
const {
  isNotOpenSession,
  isOpenSession,
} = require("./../middleweare/authMiddleweare");

router.post("/login", isNotOpenSession, userController.login);
router.get("/auth", isOpenSession, userController.getUserInfo);
router.post("/register", isNotOpenSession, userController.register);

router.get("/logout", isOpenSession, userController.logout);
module.exports = router;
