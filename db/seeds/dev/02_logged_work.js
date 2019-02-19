
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('logged_work').del()
    .then(function () {
      // Inserts seed entries
      return knex('logged_work').insert([
        {user_id: 1, log_day: '2019-01-02', hrs_worked: 5.179},
        {user_id: 1, log_day: '2019-01-03', hrs_worked: 5.509},
        {user_id: 1, log_day: '2019-01-04', hrs_worked: 8.309},
        {user_id: 1, log_day: '2019-01-05', hrs_worked: 5.854},
        {user_id: 1, log_day: '2019-01-07', hrs_worked: 7.923},
        {user_id: 1, log_day: '2019-01-08', hrs_worked: 6.345},
        {user_id: 1, log_day: '2019-01-09', hrs_worked: 8.164},
        {user_id: 1, log_day: '2019-01-10', hrs_worked: 2.248},
        {user_id: 1, log_day: '2019-01-11', hrs_worked: 9.879},
        {user_id: 1, log_day: '2019-01-13', hrs_worked: 0.872},
        {user_id: 1, log_day: '2019-01-14', hrs_worked: 8.255},
        {user_id: 1, log_day: '2019-01-15', hrs_worked: 8.515},
        {user_id: 1, log_day: '2019-01-16', hrs_worked: 9.207},
        {user_id: 1, log_day: '2019-01-17', hrs_worked: 7.513},
        {user_id: 1, log_day: '2019-01-18', hrs_worked: 7.757},
        {user_id: 1, log_day: '2019-01-19', hrs_worked: 0.618},
        {user_id: 1, log_day: '2019-01-20', hrs_worked: 0.363},
        {user_id: 1, log_day: '2019-01-21', hrs_worked: 5.93},
        {user_id: 1, log_day: '2019-01-22', hrs_worked: 8.662},
        {user_id: 1, log_day: '2019-01-23', hrs_worked: 7.281},
        {user_id: 1, log_day: '2019-01-24', hrs_worked: 10.055},
        {user_id: 1, log_day: '2019-01-25', hrs_worked: 3.367},
        {user_id: 1, log_day: '2019-01-26', hrs_worked: 4.523},
        {user_id: 1, log_day: '2019-01-28', hrs_worked: 7.505},
        {user_id: 1, log_day: '2019-01-29', hrs_worked: 5.97},
        {user_id: 1, log_day: '2019-01-30', hrs_worked: 6.644},
        {user_id: 1, log_day: '2019-01-31', hrs_worked: 6.761},
        {user_id: 1, log_day: '2019-02-01', hrs_worked: 1.923},
        {user_id: 1, log_day: '2019-02-04', hrs_worked: 6.24},

      ]);
    });
};
