exports.up = function(knex, Promise) {
  return knex.schema.createTable("project_hours", table => {
    table.increments("id").primary();
    table
      .integer("project_id")
      .references("projects.id")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("users.id")
      .onDelete("CASCADE");
    table.float("hrs_worked");
    table.date("log_day").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {};
