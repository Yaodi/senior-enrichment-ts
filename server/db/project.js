const Sequelize = require("sequelize");
const db = require("./database");
const Robot = require("./robot");

let randomPara =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Et netus et malesuada fames ac turpis egestas sed tempus. Eget magna fermentum iaculis eu non diam phasellus. Eu ultrices vitae auctor eu augue ut lectus. Pharetra diam sit amet nisl.";

const Project = db.define("project", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  deadline: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    validate: { isDate: true }
  },
  priority: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: { min: 0, max: 10 }
  },
  // MAY HAVE TO VALIDATE COMPLETED FIELD TO ONLY BE A BOOLEAN?!
  completed: { type: Sequelize.BOOLEAN, defaultValue: false },
  description: { type: Sequelize.TEXT, defaultValue: randomPara }
});

module.exports = Project;
