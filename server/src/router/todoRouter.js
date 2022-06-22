const router = require("express").Router();
const todos = require("./../controller/todoController");
const { isOpenSession } = require("./../middleweare/authMiddleweare");

router.post("/todos", isOpenSession, todos.create);
router.get("/todos/:id", isOpenSession, todos.getAll);
router.delete("/todos/:todoId", isOpenSession, todos.deletebyId);
router.post("/Updatetodo", isOpenSession, todos.updatebyId);

module.exports = router;
