const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {

  getProject(id) {
    let project = db("projects").where({ id });
    let actions = db("actions").where({ project_id: id });

    return Promise.all([project, actions]).then(results => {
      const [project, actions] = results;
      return { ...project, actions: [...actions] };
    });
  },

  createProject({ project_name, description, completed = false }) {
    return db("projects").insert({ project_name, description, completed });
  }
};
