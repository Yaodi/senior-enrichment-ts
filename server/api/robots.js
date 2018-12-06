const router = require("express").Router();
const { db, Project, Robot } = require("../db/index");

router.get("/", async (req, res, next) => {
  const robots = await Robot.findAll({
    include: { all: true },
    order: [["createdAt", "DESC"]]
  });
  res.json(robots);
});
router.get("/:robotId", async (req, res, next) => {
  const robot = await Robot.findById(req.params.robotId, {
    include: { all: true }
  });
  res.json(robot);
});
router.post("/", async (req, res, next) => {
  const newRobot = await Robot.create(req.body);
  res.json(newRobot);
});
// router.delete("/:robotId", async (req, res, next) => {
//   await Robot.destroy({where:})
// });

module.exports = router;
