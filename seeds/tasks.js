
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, task: 'Wash car', priority: 'low', completed: true},
        {id: 2, task: 'Do dishes', priority: 'medium', completed: false},
        {id: 3, task: 'Food shop', priority: 'high', completed: false}
      ]);
    });
};
