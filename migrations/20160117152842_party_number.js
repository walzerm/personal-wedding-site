
exports.up = function(knex, Promise) {
    return knex.schema.createTable('party_numbers', function(table) {
        table.increments();
        table.string('group_name');
        table.string('password');
        table.integer('atendees');
        table.boolean('rsvp');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('party_numbers');
};
