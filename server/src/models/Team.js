module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {}
  );
  Team.associate = (models) => {
    Team.belongsTo(models.User, {
      as: "user",
      foreignKey: "admin",
    });

    Team.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  };
  return Team;
};
