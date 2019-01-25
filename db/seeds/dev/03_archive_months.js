
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('archive_months').del()
    .then(function () {
      // Inserts seed entries
      return knex('archive_months').insert([
        {id: 1, user_id: 1, month: 8, year: 2018, hrs_worked: 143.816},
        {id: 2, user_id: 1, month: 9, year: 2018, hrs_worked: 137.51},
        {id: 3, user_id: 1, month: 10, year: 2018, hrs_worked: 128.869},
        {id: 4, user_id: 1, month: 11, year: 2018, hrs_worked: 147.505},
        {id: 5, user_id: 1, month: 12, year: 2018, hrs_worked: 116.564},
      ]);
    });
};
