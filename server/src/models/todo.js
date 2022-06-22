module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
    Todo.belongsTo(models.Team, {
      as: "team",
      foreignKey: "teamId",
    });
  };
  return Todo;
};
