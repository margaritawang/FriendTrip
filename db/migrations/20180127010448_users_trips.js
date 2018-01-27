
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_trips', function(table){
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('trip_id').unsigned();
    table.foreign('trip_id').references('trips.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_trips');
};
