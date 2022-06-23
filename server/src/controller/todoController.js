const db = require("./../database/database");

const Todo = db.todo;

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, indexSelected } = req.body;
    const teamId = indexSelected;
    const todo = await Todo.create({ title, userId, teamId });

    return res
      .status(201)
      .json(
        teamId === 0 ? todo : { messageTeam: "Added to team", toTeam: true }
      );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAll = async (req, res, next) => {
  try {
    if (req.params.id == 0) {
      const myTodos = await Todo.findAll({
        where: { userId: req.user.id, teamId: req.params.id },
      });
      return res.status(200).json(myTodos);
    }
    console.log(req.query);
    const myTodos = await Todo.findAll({
      where:
        req.query.search !== ""
          ? { userId: req.query.search, teamId: req.params.id }
          : { teamId: req.params.id },
    });
    return res.status(200).json(myTodos);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deletebyId = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.todoId },
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

const updatebyId = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.body.editIndex },
    });
    if (!todo) {
      return res.status(400).json({ error: "Opps Error" });
    }
    const updateData = await todo.update({ title: req.body.data });
    return res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  create,
  getAll,
  deletebyId,
  updatebyId,
};
