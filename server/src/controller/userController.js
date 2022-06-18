const db = require("./../database/database");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = db.users;

require("./password")(passport);

const login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(401).json({
        message: error,
      });
    }

    req.logIn(user, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: error,
        });
      }

      res.status(200).json({ user, isAuthenticated: true });
    });
  })(req, res, next);
};

const getUserInfo = async (req, res, next) => {
  try {
    const data = req.user;
    const isAuthInfo = req.isAuthenticated();
    res.status(200).json({ data, isAuthInfo });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const register = async (req, res, next) => {
  try {
    const { first, last, email, pass, confirmPass } = req.body;

    const _user = await User.findOne({ where: { email } });

    if (_user) {
      return res
        .status(200)
        .json({ message: "User already exist. Please login!!" });
    }

    const newUser = await new User();
    (newUser.email = email),
      (newUser.firstName = first),
      (newUser.lastName = last),
      (newUser.password = await bcrypt.hash(pass, 10));
    const savedUser = await newUser.save();

    if (savedUser) res.status(201).json({ message: "Thanks for registering" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const logout = (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.redirect(process.env.CLİENT_URL);
  });
};

module.exports = {
  register,
  login,
  logout,
  getUserInfo,
};
