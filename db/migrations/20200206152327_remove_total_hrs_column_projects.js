exports.up = function(knex) {
  return knex.schema.table("projects", function(t) {
    t.dropColumn("total_hrs");
  });
};

exports.down = function(knex) {
  return knex.schema.table("projects", function(t) {
    t.float("total_hrs").defaultTo(0);
  });
};
