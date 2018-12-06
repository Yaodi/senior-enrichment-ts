/* eslint quotes: 0 */
const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

const robots = [
  {
    name: "Cody",
    imageUrl: "/images/cody.jpg",
    fuelType: "diesel",
    fuelLevel: "44.5"
  },
  {
    name: "Ben",
    imageUrl: "/images/ben.jpg",
    Id: 3
  },
  {
    name: "Star",
    imageUrl: "/images/star.jpg"
  },
  {
    name: "Batman",
    imageUrl: "/images/batman.jpg"
  },
  {
    name: "Elliott",
    imageUrl: "/images/elliott.jpg"
  },
  {
    name: "Fira",
    imageUrl: "/images/fira.jpg"
  },
  {
    name: "Henry",
    imageUrl: "/images/henry.jpg"
  },
  {
    name: "Marcy",
    imageUrl: "/images/marcy.jpg"
  },
  {
    name: "Milton",
    imageUrl: "/images/milton.jpg"
  },
  {
    name: "Murphy",
    imageUrl: "/images/murphy.jpg"
  },
  {
    name: "Raffi",
    imageUrl: "/images/raffi.jpg"
  },
  {
    name: "Tulsi",
    imageUrl: "/images/tulsi.jpg"
  },
  {
    name: "Pork Chop",
    imageUrl: "/images/pork_chop.jpg"
  },
  {
    name: "Ribs",
    imageUrl: "/images/ribs.jpg"
  },
  {
    name: "Stacey",
    imageUrl: "/images/stacey.jpg"
  },
  {
    name: "JD",
    imageUrl: "/images/jd.jpg"
  },
  {
    name: "BenBen",
    imageUrl: "/images/benben.png"
  },
  {
    name: "Odie",
    imageUrl: "/images/odie.jpg"
  },
  { name: "Definitely Not Odie" }
];

const projects = [
  {
    title: " Cody",
    robotId: 1
  },
  {
    title: " Ben"
  },
  {
    title: " Star"
  },
  {
    title: " Batman"
  },
  {
    title: " Elliott"
  },
  {
    title: " Fira"
  },
  {
    title: " Henry"
  },
  {
    title: " Marcy"
  },
  {
    title: " Milton"
  },
  {
    title: " Murphy"
  },
  {
    title: " Raffi"
  },
  {
    title: " Tulsi"
  },
  {
    title: " Pork Chop"
  },
  {
    title: " Ribs"
  },
  {
    title: " Stacey"
  },
  {
    title: " JD"
  },
  {
    title: " BenBen"
  },
  {
    title: " Odie"
  }
];
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(robots.map(obj => Robot.create(obj)));
    await Promise.all(projects.map(obj => Project.create(obj)));

    // seed your database here!
  } catch (err) {
    console.error(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
