const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);
const express = require("express");
const router = express.Router();
const helper = require("../helpers");

router.use(express.json());

router.post("/", (req, res) => {
  console.log(req.body);
    db("projects")
      .insert(req.body)
      .then(newProject => {
        res.status(201).json(newProject);
      })
      .catch(err => {
        res.status(500).json({ error: "failed to insert project!" });
      });
});

router.get("/", (req, res) => {
  console.log(req.params.id);
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ err: "Could not get projects from database" });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let project = await db('projects').where('id', id).first();
    let actions = await db('actions').where('project_id', id);
    let projAction = {
      id: project.id,
      name: project.project_name,
      description: project.description,
      completed: project.completed === 0 ? false : true,
      actions: actions.map(i => {
        return {
          id: i.id,
          description: i.description,
          notes: i.notes,
          complete: i.completed === 0 ? false : true
        }
      })
    }
    res.status(200).json(projAction);
  } catch (e) {
    res.status(500).json({error: "error"});
  }
});

module.exports = router;
