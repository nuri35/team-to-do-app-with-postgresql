module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "team",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {}
  );
  Team.associate = (models) => {
    Team.hasMany(models.Todo, {
      as: "todos",
      foreignKey: "teamId",
    });
  };
  return Team;
};
