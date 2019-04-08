exports.seed = function(knex, Promise) {
  return knex("projects")
    .del()
    .then(function() {
      return knex("projects").insert([
        {
          id: 1,
          project_name: "this is project name",
          description: "this is project description",
          completed: false
        }
      ]);
    });
};
