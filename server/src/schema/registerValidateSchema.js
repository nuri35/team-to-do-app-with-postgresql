const { body } = require("express-validator");

const UserRegisterValidation = () => {
  return [
    body("email").trim().isEmail().normalizeEmail().toLowerCase(),
    body("pass")
      .trim()
      .isLength({ min: 4, max: 20 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    body("confirmPass").custom((value, { req }) => {
      if (value !== req.body.pass) {
        throw new Error("Password do not match");
      }
      return true;
    }),
    body("first").trim().isLength({ min: 2 }).exists().isString(),

    body("last").trim().exists().isLength({ min: 2 }).isString(),
  ];
};

module.exports = UserRegisterValidation;
