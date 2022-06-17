const express = require("express");
const app = express();
require("dotenv").config();
const mainDb = require("./src/database/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const passport = require("passport");

// const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // store: MongoStore.create({
    //   mongoUrl: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    // }),
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: process.env.WEB_SITE_URL, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", require("./src/router/blogRouter"));

mainDb();
const server = app.listen(process.env.PORT, () => {
  console.log("bu port dınlenıyor: " + process.env.PORT);
});

module.exports = server;
