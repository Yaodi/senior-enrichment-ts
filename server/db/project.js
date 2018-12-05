const Sequelize = require("sequelize");
const db = require("./database");
const Robot = require("./robot");

const Project = db.define(
  "project",
  {
    name: { type: Sequelize.STRING },
    deadline: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  }
  // {
  //   defaultScope: {
  //     include: [{ model: Robot }]
  //   }
  // }
);

module.exports = Project;
