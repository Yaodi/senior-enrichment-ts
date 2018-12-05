const router = require("express").Router();
const { db, Project, Robot } = require("../db/index");

router.get("/", async (req, res, next) => {
  const projects = await Project.findAll({ include: { all: true } });
  const robots = await Robot.findAll();
  projects[0].addRobots(robots);
  res.json(projects);
});
router.get("/:projectId", async (req, res, next) => {
  const project = await Project.findById(req.params.projectId, {
    include: { all: true }
  });
  res.json(project);
});

module.exports = router;
