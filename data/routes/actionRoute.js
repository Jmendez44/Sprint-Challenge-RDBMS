const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500);
    });
});

router.post("/", (req, res) => {
  db.insert(req.body)
    .into("actions")
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(err => {
      res.status(500).json({ err: "could not add new action" });
    });
});



module.exports = router;
