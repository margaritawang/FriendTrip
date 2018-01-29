
exports.up = function(knex, Promise) {
  return knex.schema.table('activities', function(table) {
    table.string('category');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('activities', function(table) {
    table.dropColumn('category');
  })
};
