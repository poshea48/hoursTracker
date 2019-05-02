const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../db/knex");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const DAYINSECS = 86400;
// api/users
// get all users
// Public
router.get("/", (req, res) => {
  db.select()
    .from("users")
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

// api/users/register
// register a user
// Public
router.post("/register", (req, response) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return response.status(404).json(errors);
  }

  db.select()
    .from("users")
    .where({ email: req.body.email })
    .then(res => {
      if (res.data) {
        errors.email = "Email already exists";
        return response.status(400).json(errors);
      } else {
        let newUser = {
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password_digest: req.body.password_digest
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password_digest, salt, (err, hash) => {
            if (err) throw err;
            newUser.password_digest = hash;
            db.insert(newUser)
              .returning("*")
              .into("users")
              .then(data => response.json(data[0]))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

router.patch("/profile/:id", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return response.status(404).json(errors);
  }
  const { newPassword } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPassword, salt, (err, hash) => {
      if (err) throw err;
      db("users")
        .where({ id: req.params.id })
        .update({ password_digest: hash })
        .returning("*")
        .into("users")
        .then(data => response.json(data[0]))
        .catch(err => console.log(err));
    });
  });
});

// GET api/users/login
// get user from sign in
// public

router.post("/login", (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);
  const errors = {};
  const isValid = true;
  if (!isValid) {
    return res.status(404).json(errors);
  }

  // const email = req.body.email.toLowerCase();
  // const password = req.body.password;

  // create sample login
  console.log(req.body);
  let email;
  let password;
  if (req.body.env === "development") {
    email = "poshea48@msn.com";
    password = "thewolf";
  } else {
    email = "sample@email.com";
    password = "sample";
  }

  db.select()
    .from("users")
    .where({ email: email })
    .then(data => {
      let user = data[0];
      if (!user) {
        errors.login = "Incorrect user/password combination";
        return res.status(404).json(errors);
      }
      // Check password
      bcrypt
        .compare(password, user.password_digest)
        .then(isMatch => {
          if (isMatch) {
            // create jwt payload
            const payload = { id: user.id, name: user.name };

            // sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              // { expiresIn: DAYINSECS },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.login = "Incorrect user/password combination";
            return res.status(400).json(errors);
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// GET api/users/current
// return current user
// Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// router.post('/', (req, res) => {
//   //INSERT INTO tablename(col1, col2..) VALUES(col1_val, col2_val);
//   db.insert(req.body).returning('*').into('users')
//     .then(data => res.send(data))
//     .catch(err => console.log(err))
//   // SELECT * FROM table WHERE id=inserted_row;
// })
//
// router.get('/:id', (req, res) => {
//   db('users').where({id: req.params.id})
//   .then(data => res.send(data))
//   .catch(err => console.log(err))
// })
//
// router.patch('/:id', (req, res) => {
//   db('users').where({id: req.params.id})
//     .update(req.body)
//     .returning('*')
//     .then(data => res.send(data))
//     .catch(err => console.log(err))
// })
//
// router.put('/:id', (req, res) => {
//   db('users').where({id: req.params.id})
//     .update({
//       name: req.body.name,
//       email: req.body.email,
//       password_digest: req.body.password_digest,
//       token: req.body.token || null,
//       created_at: req.body.created_at || null
//     })
//     .returning('*')
//     .then(data => res.send(data))
//     .catch(err => console.log(err))
// })

module.exports = router;
