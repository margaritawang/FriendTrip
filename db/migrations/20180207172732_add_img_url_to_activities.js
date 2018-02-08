
exports.up = function(knex, Promise) {
  return knex.schema.table('activities', function(table) {
    table.string('imgURL', 512);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('activities', function(table) {
    table.dropColumn('imgURL');
  })
};
