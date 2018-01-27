
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips', function(table) {
    table.increments('id');
    table.string('name');
    table.string('location');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('owner_id').unsigned();
    table.foreign('owner_id').references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trips')
};
