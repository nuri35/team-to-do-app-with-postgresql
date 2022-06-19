const { validationResult } = require("express-validator");

const isValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    return next();
  }
};

module.exports = isValid;
