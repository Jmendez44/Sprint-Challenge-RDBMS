const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);
const express = require("express");
const router = express.Router();

const idCheck = id => {
    if (Number(id)) {

    }
}




router.get('/', (req, res) => {
    db('projects')
        .then(projects => {
            res
            .status(200)
            .json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve projects from database' });
        });
})


router.get('/:id', (req, res) => {
    const {id} = req.params;
    projectsModel.getProject(id)
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => res.status(500).json({errorMessage: err}));
  });


module.exports = router;