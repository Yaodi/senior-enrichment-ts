const Sequelize = require("sequelize");
const db = require("./database");
const Robot = require("./robot");

let randomPara =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Et netus et malesuada fames ac turpis egestas sed tempus. Eget magna fermentum iaculis eu non diam phasellus. Eu ultrices vitae auctor eu augue ut lectus. Pharetra diam sit amet nisl. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Id eu nisl nunc mi ipsum faucibus vitae. Turpis egestas maecenas pharetra convallis posuere morbi. Tellus orci ac auctor augue mauris augue. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Quis vel eros donec ac odio tempor orci. Velit aliquet sagittis id consectetur purus ut. Nulla pharetra diam sit amet nisl suscipit. Tortor dignissim convallis aenean et tortor. Cras semper auctor neque vitae tempus quam pellentesque. Suspendisse ultrices gravida dictum fusce. Et leo duis ut diam quam nulla. Mattis rhoncus urna neque viverra justo. Faucibus interdum posuere lorem ipsum dolor sit. Enim eu turpis egestas pretium aenean pharetra magna. Est ante in nibh mauris cursus mattis. Suspendisse faucibus interdum posuere lorem. Quis auctor elit sed vulputate mi sit amet. Dapibus ultrices in iaculis nunc. Pharetra massa massa ultricies mi quis hendrerit. Dui faucibus in ornare quam viverra orci sagittis eu. Consectetur libero id faucibus nisl.";

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
