
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activities', function(table){
    table.increments('id');
    table.integer('trip_id').unsigned();
    table.foreign('trip_id').references('trips.id');
    table.date('start_date');
    table.date('end_date');
    table.string('description');
    table.integer('owner_id').unsigned();
    table.foreign('owner_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activities');
};
