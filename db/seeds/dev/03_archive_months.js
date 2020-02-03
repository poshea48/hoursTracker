exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("archive_months")
    .del()
    .then(function() {
      // Inserts seed entries
      let sample_user = knex("users")
        .where({ email: "sample@email.com" })
        .select("id");
      return knex("archive_months").insert([
        { user_id: sample_user, month: 7, year: 2019, hrs_worked: 128.869 },
        { user_id: sample_user, month: 8, year: 2019, hrs_worked: 147.505 },
        { user_id: sample_user, month: 9, year: 2019, hrs_worked: 116.564 },
        { user_id: sample_user, month: 10, year: 2019, hrs_worked: 134.264 },
        { user_id: sample_user, month: 11, year: 2019, hrs_worked: 169.04 }
      ]);
    });
};
