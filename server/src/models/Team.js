const { DataTypes } = require("sequelize");

const { Sequelize } = require("./../database/database");

const Team = Sequelize.define("team", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Team;
