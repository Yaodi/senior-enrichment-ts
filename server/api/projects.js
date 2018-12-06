const router = require("express").Router();
const { db, Project, Robot } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: { all: true },
      order: [["createdAt", "DESC"]]
    });
    const robots = await Robot.findAll();
    projects[0].addRobots(robots.slice(5));
    res.json(projects);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId, {
      include: { all: true }
    });
    res.json(project);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.json(newProject);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });

    const projects = await Project.findAll({
      include: { all: true },
      order: [["createdAt", "DESC"]]
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error("Project route not found!");
  err.status = 404;
  next(err);
});
module.exports = router;
