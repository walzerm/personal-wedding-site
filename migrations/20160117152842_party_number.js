
exports.up = function(knex, Promise) {
    return knex.schema.createTable('party_numbers', function(table) {
        table.increments();
        table.integer('number');
        table.integer('atendees');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('party_numbers');
};
