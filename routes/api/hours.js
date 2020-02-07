const express = require("express");
const router = express.Router();
const db = require("../../db/knex");
const passport = require("passport");

// get total daily hours
router.get(
  "/daily",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let date = req.query.today;
    db.raw(
      `select series as period,
      coalesce(hrs_worked, 0) as hours from
      generate_series(date_trunc('week', date '${date}'), date '${date}', '1 day'::interval) as series
      left join logged_work on logged_work.user_id = ${req.user.id} and logged_work.log_day = series group by 1, 2 order by 1`
    )
      .then(data => res.send(data.rows))
      .catch(err => console.log(err));
  }
);

router.get(
  "/weekly",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.raw(
      `select date_trunc('week', log_day) as period, sum(hrs_worked) as hours
      from logged_work where log_day >= now() - interval '1 month' and user_id = ${req.user.id} group by period order by period`
    )
      .then(data => res.send(data.rows))
      .catch(err => console.log(err));
  }
);

router.get(
  "/monthly",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.raw(
      `select date_trunc('month', log_day) as period, sum(hrs_worked) as hours
    from logged_work where logged_work.user_id = ${req.user.id} group by 1 union
    select make_date(year::integer, month::integer, 1) as period,
    hrs_worked as hours from archive_months where archive_months.user_id = ${req.user.id}
    order by period desc limit 6`
    )
      .then(data => res.send(data.rows.reverse()))
      .catch(err => console.log(err));
  }
);

router.post(
  "/log-hours",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.select()
      .from("logged_work")
      .where({ log_day: req.body.date, user_id: req.user.id })
      .then(data => {
        if (data.length === 0) {
          db("logged_work")
            .insert({
              user_id: req.user.id,
              log_day: req.body.date,
              hrs_worked: req.body.hours
            })
            .then(data => res.send(data));
        } else {
          return db("logged_work")
            .where({ log_day: req.body.date, user_id: req.user.id })
            .update({ hrs_worked: db.raw(`hrs_worked + ${req.body.hours}`) })
            .then(data => res.json(data));
        }
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/archive-hours",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let user_id = req.user.id;
    let month = new Date().getMonth() + 1 - 2;
    let year = new Date().getFullYear();
    // Adjust if month is from last year
    if (month < 1) {
      month += 12;
      year -= 1;
    }
    db.select()
      .from("archive_months")
      .where({ month: month, year: year })
      .then(data => {
        // check if data all ready has been archived
        if (data.length > 0) {
          console.log("data has all ready been archived");
          return res.send("");
        } else {
          return db
            .raw(
              `insert into archive_months (user_id, month, year, hrs_worked) values
              (${user_id}, ${month}, ${year}, (select sum(hrs_worked) from logged_work where extract('month' from log_day) = ${month}))
            `
            )
            .then(() => {
              db.raw(
                `delete from logged_work where user_id = ${req.user.id} and extract('month' from log_day) = ${month}`
              ).then(() => res.send("success"));
            });
        }
      })
      .catch(err => console.log("this is error", err));
  }
);

router.delete(
  "/delete-archived-hours",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.raw(
      `delete from archive_months where user_id = ${req.user.id} and year != extract(year from CURRENT_DATE) and month <= 12 - extract(month from CURRENT_DATE)`
    );
  }
);

// API FOR PROJECTS

router.get(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.select()
      .from("projects")
      .where({ user_id: req.user.id })
      .then(data => {
        return res.send(
          data.map(p => {
            return {
              name: p.name,
              projectId: p.id
            };
          })
        );
      })
      .catch(err => console.log("Error in /projects:", err));
  }
);

// create a new project
router.post(
  `/add_project`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors;
    db.select()
      .from("projects")
      .where({ user_id: req.user.id, name: req.body.projectName })
      .then(data => {
        if (data.length === 0) {
          db("projects")
            .returning("name")
            .insert({
              user_id: req.user.id,
              name: req.body.projectName
            })
            .then(result => {
              return res.send(result[0]);
            });
        } else {
          errors.project = "Project already exists";
          return response.status(400).json(errors);
        }
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/project/details",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { projectId } = req.query;

    db.raw(
      `select *, (select sum(hrs_worked) as total_hrs from project_hours where project_id = ${projectId}) from projects where id = '${projectId}' and user_id = ${req.user.id}`
    )
      .then(data => {
        return res.send(data.rows);
      })
      .catch(err => console.log(err));
  }
);

// get hours daily from a specific project
router.get(
  `/project/daily/:projectId`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let date = req.query.today;
    let project_id = req.params.projectId;
    let user_id = req.user.id;
    db.raw(
      `select series as period,
      coalesce(hrs_worked, 0) as hours from
      generate_series(date_trunc('week', date '${date}'), date '${date}', '1 day'::interval) as series
      left join project_hours on project_hours.user_id = ${user_id} and project_hours.project_id = ${project_id} and user_id = ${user_id} and project_hours.log_day = series group by 1, 2 order by 1
      `
    )
      .then(data => {
        return res.send(data.rows);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  `/project/weekly/:projectId`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let project_id = req.params.projectId;
    let user_id = req.user.id;
    db.raw(
      `select date_trunc('week', log_day) as period, sum(hrs_worked) as hours
      from project_hours where log_day >= now() - interval '1 month' and project_id = ${project_id} and user_id = ${user_id} group by period order by period`
    )
      .then(data => res.send(data.rows))
      .catch(err => console.log(err));
  }
);

router.get(
  `/project/monthly/:projectId`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let date = req.query.today;
    let project_id = req.params.projectId;
    let user_id = req.user.id;
    db.raw(
      `select date_trunc('month', log_day) as period, sum(hrs_worked) as hours
    from project_hours where log_day >= now() - interval '6 months' and user_id = ${user_id} and project_id = ${project_id} group by 1 order by period desc limit 6`
    )
      .then(data => res.send(data.rows.reverse()))
      .catch(err => console.log(err));
  }
);

router.post(
  `/project/log-hours/`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.select()
      .from("project_hours")
      .where({
        log_day: req.body.date,
        user_id: req.user.id,
        project_id: req.body.projectId
      })
      .then(data => {
        if (data.length === 0) {
          db("project_hours")
            .insert({
              user_id: req.user.id,
              project_id: req.body.projectId,
              log_day: req.body.date,
              hrs_worked: req.body.hours
            })
            .then(data => res.send(data));
        } else {
          db("project_hours")
            .where({
              log_day: req.body.date,
              user_id: req.user.id,
              project_id: req.body.projectId
            })
            .update({ hrs_worked: db.raw(`hrs_worked + ${req.body.hours}`) })
            .then(data => res.json(data));
        }
      })
      .then(data => {
        db("projects")
          .where({ id: req.body.projectId })
          .update({ total_hrs: db.raw(`total_hrs + ${req.body.hours}`) })
          .then(data => res.json(data));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
