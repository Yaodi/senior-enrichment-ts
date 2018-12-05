"use strict";

const router = require("express").Router();
const { db, Project, Robot } = require("../db/index");

// Your routes go here!
// NOTE: Any routes that you put here are ALREADY mounted on `/api`
// You can put all routes in this file HOWEVER,
// this file should almost be like a table of contents for the routers you create!
// For example:
//
// For your `/api/puppies` routes:
// router.use('/puppies', require('./puppies'))
//
// And for your `/api/kittens` routes:
// router.use('/kittens', require('./kittens'))

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!

router.get("/robots", async (req, res, next) => {
  const robots = await Robot.findAll({ include: { all: true } });
  res.json(robots);
});

router.get("/projects", async (req, res, next) => {
  const projects = await Project.findAll({ include: { all: true } });
  const robots = await Robot.findAll();
  projects[0].addRobots(robots);
  res.json(projects);
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
