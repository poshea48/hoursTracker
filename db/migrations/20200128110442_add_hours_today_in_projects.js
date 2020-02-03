exports.up = function(knex) {
  return knex.schema.table("projects", table => {
    table.float("hours_today").defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.table("projects", table => {
    table.dropColumn("hours_today");
  });
};
