
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rsvp', function(table) {
        table.increments();
        table.string('guest_name');
        table.integer('party_number');
        table.string('response');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rsvp');
};
