
exports.up = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.date('start_date');
    table.date('end_date');
    table.string('imgURL');
    table.dropColumn('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.dropColumn('start_date');
    table.dropColumn('end_date');
    table.dropColumn('imgURL');
    table.string('name');
  })
};
