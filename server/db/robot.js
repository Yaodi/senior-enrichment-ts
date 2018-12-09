const Sequelize = require("sequelize");
const db = require("./database");
const Project = require("./project");

const Robot = db.define("robot", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  fuelType: {
    type: Sequelize.STRING,
    defaultValue: "electric",
    validate: { isIn: [["diesel", "gas", "electric"]] }
  },
  fuelLevel: {
    type: Sequelize.DECIMAL,
    defaultValue: 100,
    validate: { min: 0, max: 100 }
  },
  imageUrl: { type: Sequelize.STRING, defaultValue: "/images/default.png" }
});

module.exports = Robot;
