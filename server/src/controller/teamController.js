const db = require("./../database/database");

const Team = db.team;

const create = async (req, res, next) => {
  try {
    const { teamName } = req.body;
    const team = await Team.create({
      teamName,
      admin: req.user.id,
      userId: req.user.id,
    });
    return res.status(201).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getAll = async (req, res, next) => {
  try {
    const myTeams = await Team.findAll({
      where: { userId: req.user.id },
    });
    return res.status(200).json(myTeams);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  create,
  getAll,
};
