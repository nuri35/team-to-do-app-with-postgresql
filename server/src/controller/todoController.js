const db = require("./../database/database");

const Todo = db.todo;

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    const todo = await Todo.create({ title, userId });
    return res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAll = async (req, res, next) => {
  try {
    const myTodos = await Todo.findAll({
      where: { userId: req.user.id },
    });
    return res.status(200).json(myTodos);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deletebyId = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.todoId, userId: req.user.id },
    });
    if (!todo) {
      return res.status(400).json({ error: "Opps Error" });
    }
    await todo.destroy();
    return res.status(200).json({});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  create,
  getAll,
  deletebyId,
};
