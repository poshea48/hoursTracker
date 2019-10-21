exports.up = function(knex, Promise) {
  return knex.schema.table("projects", table => {
    table.float("total_hrs").defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("projects", table => {
    table.dropColumn("total_hrs");
  });
};
