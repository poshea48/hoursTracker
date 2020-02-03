exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("logged_work")
    .del()
    .then(function() {
      // Inserts seed entries
      let sample_user = knex("users")
        .where({ email: "sample@email.com" })
        .select("id");
      return knex("logged_work").insert([
        { user_id: sample_user, log_day: "2019-12-02", hrs_worked: 8.717 },
        { user_id: sample_user, log_day: "2019-12-03", hrs_worked: 7.419 },
        { user_id: sample_user, log_day: "2019-12-04", hrs_worked: 7 },
        { user_id: sample_user, log_day: "2019-12-05", hrs_worked: 8.838 },
        { user_id: sample_user, log_day: "2019-12-06", hrs_worked: 7.878 },
        { user_id: sample_user, log_day: "2019-12-08", hrs_worked: 1.679 },
        { user_id: sample_user, log_day: "2019-12-09", hrs_worked: 7.991 },
        { user_id: sample_user, log_day: "2019-12-10", hrs_worked: 7.738 },
        { user_id: sample_user, log_day: "2019-12-11", hrs_worked: 7.67 },
        { user_id: sample_user, log_day: "2019-12-12", hrs_worked: 6.631 },
        { user_id: sample_user, log_day: "2019-12-13", hrs_worked: 7.142 },
        { user_id: sample_user, log_day: "2019-12-14", hrs_worked: 2.979 },
        { user_id: sample_user, log_day: "2019-12-16", hrs_worked: 8.049 },
        { user_id: sample_user, log_day: "2019-12-17", hrs_worked: 7.388 },
        { user_id: sample_user, log_day: "2019-12-18", hrs_worked: 5.199 },
        { user_id: sample_user, log_day: "2019-12-19", hrs_worked: 4.401 },
        { user_id: sample_user, log_day: "2019-12-20", hrs_worked: 1.898 },
        { user_id: sample_user, log_day: "2019-12-22", hrs_worked: 5.05 },
        { user_id: sample_user, log_day: "2019-12-23", hrs_worked: 7.22 },
        { user_id: sample_user, log_day: "2019-12-26", hrs_worked: 7.169 },
        { user_id: sample_user, log_day: "2019-12-27", hrs_worked: 9.267 },
        { user_id: sample_user, log_day: "2019-12-29", hrs_worked: 0.347 },
        { user_id: sample_user, log_day: "2019-12-30", hrs_worked: 9.58 },
        { user_id: sample_user, log_day: "2019-12-31", hrs_worked: 4.771 },
        { user_id: sample_user, log_day: "2020-01-02", hrs_worked: 8.739 },
        { user_id: sample_user, log_day: "2020-01-03", hrs_worked: 4.994 },
        { user_id: sample_user, log_day: "2020-01-04", hrs_worked: 6.5357 },
        { user_id: sample_user, log_day: "2020-01-06", hrs_worked: 1.017 },
        { user_id: sample_user, log_day: "2020-01-07", hrs_worked: 8.46 },
        { user_id: sample_user, log_day: "2020-01-08", hrs_worked: 8.202 },
        { user_id: sample_user, log_day: "2020-01-09", hrs_worked: 6.13 },
        { user_id: sample_user, log_day: "2020-01-10", hrs_worked: 4.628 },
        { user_id: sample_user, log_day: "2020-01-11", hrs_worked: 4.863 },
        { user_id: sample_user, log_day: "2020-01-12", hrs_worked: 7.573 },
        { user_id: sample_user, log_day: "2020-01-13", hrs_worked: 8.238 },
        { user_id: sample_user, log_day: "2020-01-14", hrs_worked: 7.513 },
        { user_id: sample_user, log_day: "2020-01-15", hrs_worked: 5.022 },
        { user_id: sample_user, log_day: "2020-01-16", hrs_worked: 9.405 },
        { user_id: sample_user, log_day: "2020-01-17", hrs_worked: 5.754 },
        { user_id: sample_user, log_day: "2020-01-20", hrs_worked: 0 },
        { user_id: sample_user, log_day: "2020-01-21", hrs_worked: 7.58 },
        { user_id: sample_user, log_day: "2020-01-22", hrs_worked: 10.561 },
        { user_id: sample_user, log_day: "2020-01-23", hrs_worked: 9.029 },
        { user_id: sample_user, log_day: "2020-01-24", hrs_worked: 6.957 },
        { user_id: sample_user, log_day: "2020-01-25", hrs_worked: 2.785 },
        { user_id: sample_user, log_day: "2020-01-27", hrs_worked: 2.826 },
        { user_id: sample_user, log_day: "2020-01-28", hrs_worked: 8.192 },
        { user_id: sample_user, log_day: "2020-01-29", hrs_worked: 8.323 },
        { user_id: sample_user, log_day: "2020-01-30", hrs_worked: 5.892 },
        { user_id: sample_user, log_day: "2020-01-31", hrs_worked: 11.388 }
      ]);
    });
};
