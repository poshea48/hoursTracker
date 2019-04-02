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
        { user_id: sample_user, log_day: "2019-03-02", hrs_worked: 5.179 },
        { user_id: sample_user, log_day: "2019-03-03", hrs_worked: 5.509 },
        { user_id: sample_user, log_day: "2019-03-04", hrs_worked: 8.309 },
        { user_id: sample_user, log_day: "2019-03-05", hrs_worked: 5.854 },
        { user_id: sample_user, log_day: "2019-03-07", hrs_worked: 7.923 },
        { user_id: sample_user, log_day: "2019-03-08", hrs_worked: 6.345 },
        { user_id: sample_user, log_day: "2019-03-09", hrs_worked: 8.164 },
        { user_id: sample_user, log_day: "2019-03-10", hrs_worked: 2.248 },
        { user_id: sample_user, log_day: "2019-03-11", hrs_worked: 9.879 },
        { user_id: sample_user, log_day: "2019-03-13", hrs_worked: 0.872 },
        { user_id: sample_user, log_day: "2019-03-14", hrs_worked: 8.255 },
        { user_id: sample_user, log_day: "2019-03-15", hrs_worked: 8.515 },
        { user_id: sample_user, log_day: "2019-03-16", hrs_worked: 9.207 },
        { user_id: sample_user, log_day: "2019-03-17", hrs_worked: 7.513 },
        { user_id: sample_user, log_day: "2019-03-18", hrs_worked: 7.757 },
        { user_id: sample_user, log_day: "2019-03-19", hrs_worked: 0.618 },
        { user_id: sample_user, log_day: "2019-03-20", hrs_worked: 0.363 },
        { user_id: sample_user, log_day: "2019-03-21", hrs_worked: 5.93 },
        { user_id: sample_user, log_day: "2019-03-22", hrs_worked: 8.662 },
        { user_id: sample_user, log_day: "2019-03-23", hrs_worked: 7.281 },
        { user_id: sample_user, log_day: "2019-03-24", hrs_worked: 10.055 },
        { user_id: sample_user, log_day: "2019-03-25", hrs_worked: 3.367 },
        { user_id: sample_user, log_day: "2019-03-26", hrs_worked: 4.523 },
        { user_id: sample_user, log_day: "2019-03-28", hrs_worked: 7.505 },
        { user_id: sample_user, log_day: "2019-03-29", hrs_worked: 5.97 },
        { user_id: sample_user, log_day: "2019-03-30", hrs_worked: 6.644 },
        { user_id: sample_user, log_day: "2019-03-31", hrs_worked: 6.761 },
        { user_id: sample_user, log_day: "2019-02-01", hrs_worked: 1.923 },
        { user_id: sample_user, log_day: "2019-02-04", hrs_worked: 6.24 }
      ]);
    });
};
