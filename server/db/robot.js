const Sequelize = require("sequelize");
const db = require("./database");
const Project = require("./project");

const Robot = db.define(
  "robot",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    fuelType: { type: Sequelize.STRING, defaultValue: "electric" },
    fuelLevel: { type: Sequelize.DECIMAL, defaultValue: 100 },
    imageUrl: { type: Sequelize.STRING, defaultValue: "/images/odie.jpg" }
  }
  // {
  //   defaultScope: {
  //     include: [{ model: Project }]
  //   }
  // }
);

module.exports = Robot;
