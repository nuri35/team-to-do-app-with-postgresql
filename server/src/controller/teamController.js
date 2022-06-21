const db = require("./../database/database");
const Team = db.team;
const Userteam = db.userteam;
const User = db.users;

const create = async (req, res, next) => {
  try {
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
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const addUser = async (req, res, next) => {
  // 1 kullancı 1 kez gruba eklenır backende kontorol et birde olmayan bir gruba eklenebılır bunuda kontrol et
  const userId = req.body.userId;
  const teamId = req.body.teamId;
  try {
    const result = await Userteam.create({ userId, teamId });

    const addedUser = await User.findOne({
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

const fetchAddedUser = () => {
  try {
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
