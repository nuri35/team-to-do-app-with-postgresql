# team-to-do-app-with-postgresql

> To do app team structure with postgresql database.

## Table of Contents

- - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Setup](#setup)
  - [Setup sequelize database](#setup-sequelize-database)
  - [Contact](#contact)

   <!-- * [License](#license) -->

## General Information

- In this application, database front end backend and docker issues were handled as a team structure by performing to do crud operations.
- There are 2 user types in the project, user and admin. People other than the admin cannot add or delete users and create teams. Everything is done through the admin.
- In addition, each user can make their own special to do list. can delete edit. Finally, the team can prepare, delete, edit and update a to-do list.
- Admin = 1
- User = 0
- private = 0
- If the user is making a custom to-do list, the team id will be 0. However, if a team-based to-do list is being prepared, not a special one, the ID of that team will be included in the to-do list table.

## Technologies Used

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="redis" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg" alt="express" width="40" height="40"/>

## Features

List the ready features here:

- Postgresql Database and data type,sequelize orm
- Node js crud process and team structure
- React, redux

## Screenshots

![Example screenshot](https://github.com/nuri35/team-to-do-app-with-postgresql/blob/master/project%20images/Ekran%20Al%C4%B1nt%C4%B1s%C4%B1.PNG)

![Example screenshot](https://github.com/nuri35/team-to-do-app-with-postgresql/blob/master/project%20images/content.PNG)

![Example screenshot](https://github.com/nuri35/team-to-do-app-with-postgresql/blob/master/project%20images/login.PNG)

## Setup

```sh
npm init -y
npm install
```

## Setup sequelize database

```sh
const { Sequelize, DataTypes } = require("sequelize");
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./../models/User")(sequelize, DataTypes);
db.todo = require("./../models/todo")(sequelize, DataTypes);
db.team = require("./../models/Team")(sequelize, DataTypes);
db.userteam = require("../models/Userteam")(sequelize, DataTypes);

db.users.belongsToMany(db.team, {
  through: "userTeam",
  foreignKey: "userId",
});

db.team.belongsToMany(db.users, {
  through: "userTeam",
  foreignKey: "teamId",
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("yes re-sync done!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
```

## Contact

Created by [@nurettinsen](https://www.linkedin.com/in/nurettin-sen/) - feel free to contact me!
