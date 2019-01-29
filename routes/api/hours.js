const express = require('express')
const router = express.Router();
const db = require('../../db/knex')
const passport = require('passport')

// GET all hours
router.get('/', (req, res) => {
  db.select().from('logged_work')
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

// router.get(
//   '/today',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     db.select('hrs_worked as hours').from('logged_work')
//       .whereRaw(`user_id = ${req.user.id} and log_day = current_date`)
//       // .whereRaw('log_day = current_date and id = ')
//       .then(data => res.json(data[0]))
//       .catch(err => console.log(err))
// })

router.get(
  '/daily',
  passport.authenticate('jwt', { session: false }),
 (req, res) => {
    db.raw(`select series as period,
      coalesce(hrs_worked, 0) as hours from
      generate_series(date_trunc('week', current_date), current_date, '1 day'::interval) as series
      left join logged_work on logged_work.user_id = ${req.user.id} and logged_work.log_day = series group by 1, 2 order by 1`)
      .then(data => res.send(data.rows))
      .catch(err => console.log(err))
})

router.get(
  '/weekly',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    db.raw(`select date_trunc('week', log_day) as period, sum(hrs_worked) as hours
      from logged_work where user_id = ${req.user.id} group by period`)
      .then(data => res.send(data.rows))
      .catch(err => console.log(err))
})

router.get(
  '/monthly',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    db.raw(`select date_trunc('month', log_day) as period, sum(hrs_worked) as hours
    from logged_work where logged_work.user_id = ${req.user.id} group by 1 union
    select make_date(year::integer, month::integer, 1) as period,
    hrs_worked as hours from archive_months where archive_months.user_id = ${req.user.id}
    order by period desc limit 6`)
      .then(data => res.send(data.rows.reverse()))
      .catch(err => console.log(err))
})

router.post(
  '/log-hours',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    db.select().from('logged_work')
      .where({ log_day: req.body.date, user_id: req.user.id})
      .then(data => {
        if (data.length === 0) {
          db('logged_work').insert({user_id: req.user.id, log_day: req.body.date, hrs_worked: req.body.hours})
          .then(data => res.send(data))
        } else {
          return db('logged_work')
            .where({log_day: req.body.date, user_id: req.user.id} )
            .update({'hrs_worked': db.raw(`hrs_worked + ${req.body.hours}`)})
            .then(data => res.json(data))

        }
      })
      .catch(err => console.log(err))

})

module.exports = router
