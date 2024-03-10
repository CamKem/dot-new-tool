/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.createTable('records', table => {
    table.increments('id').primary();
    table.string('slug').unique().notNullable();
    table.string('user').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('records');
};
