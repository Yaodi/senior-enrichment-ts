const Sequelize = require("sequelize");
const db = require("./database");
const Project = require("./project");

const Robot = db.define(
  "robot",
  {
    name: { type: Sequelize.STRING },
    imageUrl: { type: Sequelize.STRING }
  }
  // {
  //   defaultScope: {
  //     include: [{ model: Project }]
  //   }
  // }
);

module.exports = Robot;
