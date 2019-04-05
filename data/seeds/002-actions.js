exports.seed = function(knex, Promise) {
  return knex("actions")
    .del()
    .then(function() {
      return knex("actions").insert([
        {
          id: 1,
          description: "finished action",
          notes: "finished action",
          completed: true
        },

        {
          id: 2,
          description: "unfinished action",
          notes: "unfinished action",
          completed: false
        }
      ]);
    });
};
