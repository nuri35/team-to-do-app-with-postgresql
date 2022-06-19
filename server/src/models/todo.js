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
    },
    {}
  );
  Todo.associate = (models) => {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  };
  return Todo;
};
