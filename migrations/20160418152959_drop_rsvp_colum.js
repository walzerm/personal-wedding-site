
exports.up = function(knex, Promise) {
    return knex.schema.table('party_numbers', function (table) {
        table.dropColumn('rsvp');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('party_numbers', function (table) {
        table.boolean('rsvp');
    });
};
