/* eslint quotes: 0 */
const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

const robots = [
  {
    name: "Cody",
    imageUrl: `https://robohash.org/${Math.random()}`,
    fuelType: "diesel",
    fuelLevel: "44.5"
  },
  {
    name: "Ben",
    imageUrl: `https://robohash.org/${Math.random()}`,
    Id: 3
  },
  {
    name: "Star",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Batman",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Elliott",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Fira",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Henry",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Marcy",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Milton",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Murphy",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Raffi",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Tulsi",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Pork Chop",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Ribs",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Stacey",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "JD",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "BenBen",
    imageUrl: `https://robohash.org/${Math.random()}`
  },
  {
    name: "Odie",
    imageUrl: `https://robohash.org/${Math.random()}`
  }
];

const projects = [
  {
    title: "Mission Impossible"
  },
  {
    title: "Mission Impossible 2"
  },
  {
    title: "Mission Impoossible 3"
  },
  {
    title: "Mission Impossible: Ghost Protocol"
  },
  {
    title: "Mission Impossible: Rogue Nation"
  },
  {
    title: "Mission Impossible: Fallout"
  }
];
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(robots.map(obj => Robot.create(obj)));
    await Promise.all(projects.map(obj => Project.create(obj)));
    const allProjects = await Project.findAll();
    const projectsToRelate = allProjects.slice(0, 5);
    const allRobots = await Robot.findAll();
    const robotsToRelate = allRobots.slice(0, 5);
    for (let i = 0; i < robotsToRelate.length; i++) {
      await robotsToRelate[i].addProjects(projectsToRelate);
    }

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
