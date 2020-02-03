exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("archive_months")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("archive_months").insert([
        { user_id: 6, month: 7, year: 2019, hrs_worked: 128.869 },
        { user_id: 6, month: 8, year: 2019, hrs_worked: 147.505 },
        { user_id: 6, month: 9, year: 2019, hrs_worked: 116.564 },
        { user_id: 6, month: 10, year: 2019, hrs_worked: 134.264 },
        { user_id: 6, month: 11, year: 2019, hrs_worked: 169.04 }
      ]);
    });
};
