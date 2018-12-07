const router = require("express").Router();
const path = require("path");

const { db, Project, Robot } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const robots = await Robot.findAll({
      include: { all: true },
      order: [["createdAt", "DESC"]]
    });
    res.json(robots);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findById(req.params.id, {
      include: { all: true }
    });
    res.json(robot);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Robot.update(req.body, {
      // include: { all: true },
      where: { id: req.params.id },
      // RETURNING TRUE GIVES US OUR UPDATED ROW BACK
      returning: true
    });
    res.json(affectedRows[0]);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newRobot = await Robot.create(req.body);
    res.json(newRobot);
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await Robot.destroy({ where: { id: req.params.id } });

    const robots = await Robot.findAll({
      include: { all: true },
      order: [["createdAt", "DESC"]]
    });
    res.json(robots);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error("Robot route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
