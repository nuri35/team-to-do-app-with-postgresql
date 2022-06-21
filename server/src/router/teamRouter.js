const router = require("express").Router();
const teams = require("./../controller/teamController");
const { isOpenSession } = require("./../middleweare/authMiddleweare");

router.post("/teams", isOpenSession, teams.create);
router.get("/teams", isOpenSession, teams.getAll);
router.post("/addUserToTeams", isOpenSession, teams.addUser);
router.get("/fetchAddedUser/:id", isOpenSession, teams.fetchAddedUser);
module.exports = router;
