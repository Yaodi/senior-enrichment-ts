const router = require("express").Router();
const { db, Project, Robot } = require("../db/index");

router.get("/all/:sortBy", async (req, res, next) => {
  try {
    console.log(req.params.sortBy);
    const projects = await Project.findAll({
      include: { all: true },
      order: [[req.params.sortBy, "DESC"]]
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id, {
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

router.put("/:id", async (req, res, next) => {
  try {
    console.log(req.params);
    const [numberOfAffectedRows, affectedRows] = await Project.update(
      req.body,
      {
        // include: { all: true },
        where: { id: req.params.id },
        // RETURNING TRUE GIVES US OUR UPDATED ROW BACK
        returning: true
      }
    );
    const updatedInstance = await Project.findById(req.params.id, {
      include: { all: true }
    });
    res.json(updatedInstance);
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
