const isOpenSession = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Please login" });
  }
};

const isNotOpenSession = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "failed" });
  }
};

module.exports = { isOpenSession, isNotOpenSession };
