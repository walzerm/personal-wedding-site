
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rsvp', function(table) {
        table.increments();
        table.string('group_name');
        table.json('names');
        table.boolean('response');
        table.text('notes');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rsvp');
};
