const router = require("express").Router();
const { Robot } = require("../db/index");

router.get("/all/:sortBy", async (req, res, next) => {
  try {
    const robots = await Robot.findAll({
      include: { all: true },
      order: [[req.params.sortBy, "DESC"]]
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
    await Robot.update(req.body, {
      where: { id: req.params.id }
    });
    const updatedInstance = await Robot.findById(req.params.id, {
      include: { all: true }
    });
    res.json(updatedInstance);
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
