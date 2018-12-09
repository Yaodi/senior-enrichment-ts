const Sequelize = require("sequelize");
const db = require("./database");

let randomPara =
  "Good morning, Mr. Hunt. Your mission, should you choose to accept it, involves the recovery of a stolen item designated 'Chimera.' You may select any two team members, but it is essential that the third member of your team be Nyah Nordoff-Hall. She is a civilian, and a highly capable professional thief. You have forty-eight hours to recruit Miss Hall and meet me in Seville to receive your assignment. As always, should any member of your team be caught or killed, the Secretary will disavow all knowledge of your actions. And Mr. Hunt, the next time you go on holiday, please be good enough to let us know where you're going. This message will self-destruct in five seconds.";

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
  completed: { type: Sequelize.BOOLEAN, defaultValue: false },
  description: { type: Sequelize.TEXT, defaultValue: randomPara }
});

module.exports = Project;
