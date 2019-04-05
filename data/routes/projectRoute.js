const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);
const express = require("express");
const router = express.Router();
const helper = require("../helpers");

const idCheck = (req, res, next) => {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error("invalid ID"));
  }
};

router.post("/", (req, res) => {
  console.log(req);
  if (req.body.project_name) {
    db('projects').insert(req.body)
      .then(newProject => {
        res.status(201).json(newProject);
      })
      .catch(err => {
        res.status(500).json({ error: "failed to insert project!" });
      });
  } else if (!req.body.project_name) {
    res.status(400).json({ error: "no name field" });
  } else {
    res.status(500).json({ error: "failed to add project" });
  }
});



router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "Could not get projects from database" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  helper
    .getProject(id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
});

module.exports = router;
