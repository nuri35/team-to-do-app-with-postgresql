const router = require("express").Router();
const teams = require("./../controller/teamController");
const { isOpenSession } = require("./../middleweare/authMiddleweare");

router.post("/teams", isOpenSession, teams.create);
router.get("/teams", isOpenSession, teams.getAll);

module.exports = router;
