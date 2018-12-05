const router = require("express").Router();
const { db, Project, Robot } = require("../db/index");

router.get("/", async (req, res, next) => {
  const robots = await Robot.findAll({ include: { all: true } });
  res.json(robots);
});
router.get("/:robotId", async (req, res, next) => {
  const robot = await Robot.findById(req.params.robotId, {
    include: { all: true }
  });
  res.json(robot);
});

module.exports = router;
