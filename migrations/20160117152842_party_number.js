
exports.up = function(knex, Promise) {
    return knex.schema.createTable('party_numbers', function(table) {
        table.increments();
        table.integer('user_id');
        table.string('password');
        table.integer('atendees');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('party_numbers');
};
