const LocalStrategy = require("passport-local").Strategy;
const db = require("./../database/database");
const bcrypt = require("bcrypt");
const User = db.users;

module.exports = function (passport) {
  const options = {
    usernameField: "Email",
    passwordField: "password",
  };

  passport.use(
    new LocalStrategy(options, async (email, password, done) => {
      try {
        const _bulunanuser = await User.findOne({ where: { email } });

        if (!_bulunanuser) {
          return done("Email or password is incorrect", false);
        }

        const passwordControl = await bcrypt.compare(
          password,
          _bulunanuser.password
        );

        if (!passwordControl) {
          return done("Email or password is incorrect", false);
        } else {
          return done(null, _bulunanuser, "Welcome");
        }
      } catch (err) {
        done(err);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
