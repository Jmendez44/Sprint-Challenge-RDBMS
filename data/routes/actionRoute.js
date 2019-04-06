const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);
const express = require("express");
const router = express.Router();

router.use(express.json());

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
    console.log(req.body);
      db("actions")
        .insert(req.body)
        .then(newAction => {
          res.status(201).json(newAction);
        })
        .catch(err => {
          res.status(500).json({ error: "failed to insert action!" });
        });
  });

module.exports = router;
