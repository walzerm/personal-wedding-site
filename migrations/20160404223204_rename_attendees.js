
exports.up = function(knex, Promise) {
    return knex.schema.table('party_numbers', function (table) {
        table.renameColumn('atendees', 'attendees');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('party_numbers', function (table) {
        table.renameColumn('attendees', 'atendees');
    });
};
