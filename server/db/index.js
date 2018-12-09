const db = require("./database");
const Project = require("./project");
const Robot = require("./robot");

Robot.belongsToMany(Project, { through: "assignment" });
Project.belongsToMany(Robot, { through: "assignment" });

module.exports = {
  db,
  Project,
  Robot
};
