const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
var pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, WEB_SITE_URL } =
  process.env;

const store = new pgSession({
  conString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,

  createTableIfMissing: true,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: WEB_SITE_URL, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./src/router/todoRouter"));
app.use("/api", require("./src/router/userRouter"));
app.use("/api", require("./src/router/teamRouter"));

app.use((req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});

const server = app.listen(process.env.PORT, () => {
  console.log("bu port dınlenıyor: " + process.env.PORT);
});

module.exports = server;
