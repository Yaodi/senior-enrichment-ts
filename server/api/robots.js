const router = require("express").Router();
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
router.get("/:robotId", async (req, res, next) => {
  try {
    const robot = await Robot.findById(req.params.robotId, {
      include: { all: true }
    });
    res.json(robot);
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
router.delete("/", (req, res, next) => {
  try {
    console.log("We have our object here!!!", req.body);
    res.send("haha");
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
