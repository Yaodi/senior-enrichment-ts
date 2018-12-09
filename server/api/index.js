"use strict";
const router = require("express").Router();
const { Project, Robot } = require("../db/index");

router.use("/robots", require("./robots"));
router.use("/projects", require("./projects"));

router.put("/relations", async (req, res, next) => {
  try {
    let robotInstance = await Robot.findById(req.body.robotId);
    let projectInstance = await Project.findById(req.body.projectId);
    await robotInstance.removeProject(projectInstance);
    let updatedInstance;
    req.body.type === "Project"
      ? (updatedInstance = await Project.findById(req.body.projectId, {
          include: { all: true }
        }))
      : (updatedInstance = await Robot.findById(req.body.robotId, {
          include: { all: true }
        }));
    res.json(updatedInstance);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
