exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      let sample_user = knex("users")
        .where({ email: "sample@email.com" })
        .select("id");
      return knex("projects").insert([
        {
          id: 1,
          name: "Basecamp-Application",
          user_id: sample_user,
          total_hrs: 38.1,
          hours_today: 0
        }
      ]);
    });
};
