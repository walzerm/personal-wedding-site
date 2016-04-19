
exports.up = function(knex, Promise) {
  return knex.schema.table('party_numbers', function (table) {
    table.boolean('rehearsal_dinner');
    table.boolean('sunday_brunch');
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('party_numbers', function (table) {
    table.dropColumn('rehearsal_dinner');
    table.dropColumn('sunday_brunch');
  });
};
