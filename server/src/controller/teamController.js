const db = require("./../database/database");
const { Op } = require("sequelize");
const Team = db.team;
const Userteam = db.userteam;
const User = db.users;

const create = async (req, res, next) => {
  try {
    if (req.user.role !== 1) {
      return res.status(400).json({
        message: "Only admins can create teams, add and delete users",
      });
    }
    const { teamName } = req.body;
    const team = await Team.create({
      teamName,
    });
    const { id } = team.dataValues;

    await Userteam.create({ userId: req.user.id, teamId: id });

    return res.status(201).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

//bırde delete kaldı herkes herkesı sılebılır yarın sabah yaparsın en sonda backend bakarsın gine aççık var mı denersın

const getAll = async (req, res, next) => {
  try {
    const myTeams = await Team.findAll({
      include: [
        {
          model: User,

          where: { id: req.user.id },
        },
      ],
    });

    return res.status(200).json(myTeams);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const addUser = async (req, res, next) => {
  const userId = req.body.userId;
  const teamId = req.body.teamId;
  try {
    if (req.user.role !== 1) {
      return res.status(400).json({
        message: "Only admins can create teams, add and delete users",
      });
    }
    const result = await Userteam.create({ userId, teamId });

    const addedUser = await User.findOne({
      where: { id: result.userId },
      include: [
        {
          model: Team,

          where: { id: result.teamId },
        },
      ],
    });

    return res.status(200).json(addedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const fetchAddedUser = async (req, res, next) => {
  try {
    const fetchUser = await User.findAll({
      where: { id: { [Op.ne]: req.user.id } },
      include: [
        {
          model: Team,

          where: { id: req.params.id },
        },
      ],
    });
    return res.status(200).json(fetchUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  create,
  getAll,
  addUser,
  fetchAddedUser,
};
