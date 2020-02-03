exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("project_hours")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("project_hours").insert([
        { project_id: 3, user_id: 3, hrs_worked: 3.3, log_day: "2020-01-17" },
        { project_id: 3, user_id: 3, hrs_worked: 4.2, log_day: "2020-01-21" },
        { project_id: 3, user_id: 3, hrs_worked: 4.6, log_day: "2020-01-22" },
        { project_id: 3, user_id: 3, hrs_worked: 3.8, log_day: "2020-01-27" },
        { project_id: 3, user_id: 3, hrs_worked: 4.1, log_day: "2020-01-28" },
        { project_id: 3, user_id: 3, hrs_worked: 5.8, log_day: "2020-01-30" },
        { project_id: 3, user_id: 3, hrs_worked: 6.2, log_day: "2020-01-31" },
        { project_id: 3, user_id: 3, hrs_worked: 2.3, log_day: "2020-02-01" },
        { project_id: 3, user_id: 3, hrs_worked: 3.8, log_day: "2020-02-02" }
      ]);
    });
};
