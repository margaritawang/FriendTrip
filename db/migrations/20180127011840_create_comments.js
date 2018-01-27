
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments('id');
    table.string('description');
    table.integer('activity_id').unsigned();
    table.foreign('activity_id').references('activities.id');
    table.integer('owner_id').unsigned();
    table.foreign('owner_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
