module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define(
    "userTeam",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: "user",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        unique: "unique-team-per-user",
      },
      teamId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: "Team",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        unique: "unique-team-per-user",
      },
    },

    { timestamps: false }
  );

  UserTeam.associate = (models) => {
    UserTeam.belongsTo(models.User, {
      foreignKey: "userId",
    });
    UserTeam.belongsTo(models.Team, {
      foreignKey: "teamId",
    });
  };

  return UserTeam;
};
