const router = require("express").Router();
const { db, Project, Robot } = require("../db/index");

router.get("/", async (req, res, next) => {
  const projects = await Project.findAll({ include: { all: true } });
  const robots = await Robot.findAll();
  projects[0].addRobots(robots.slice(5));
  res.json(projects);
});
router.get("/:projectId", async (req, res, next) => {
  const project = await Project.findById(req.params.projectId, {
    include: { all: true }
  });
  res.json(project);
});
router.post("/", async (req, res, next) => {
  console.log("right before project.create");
  const newProject = await Project.create(req.body);
  console.log(newProject);
  res.json(newProject);
});

module.exports = router;
