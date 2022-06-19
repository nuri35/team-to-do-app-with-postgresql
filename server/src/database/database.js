const { Sequelize, DataTypes } = require("sequelize");
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./../models/User")(sequelize, DataTypes);
db.todo = require("./../models/todo")(sequelize, DataTypes);
db.team = require("./../models/team")(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("yes re-sync done!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
