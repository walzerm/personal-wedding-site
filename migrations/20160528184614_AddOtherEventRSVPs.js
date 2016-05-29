
exports.up = function(knex, Promise) {
  return knex.schema.table('rsvp', function (table) {
    table.boolean('rehearsal_dinner_response');
    table.boolean('sunday_brunch_response');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table('rsvp', function (table) {
    table.dropColumn('rehearsal_dinner_response');
    table.dropColumn('sunday_brunch_response');
  });
};
