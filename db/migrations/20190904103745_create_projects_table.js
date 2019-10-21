exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", table => {
    table.increments("id").primary();
    table.string("name").notNull();
    table
      .integer("user_id")
      .references("users.id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("projects");
};
