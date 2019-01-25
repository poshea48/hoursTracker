// Import User model
const express = require('express');
const router = express.Router()
const User = require('../models/User');

// @route GET '/users/all'
// @desc show all users
// Public

router.get('/all', (req, res) => {
  return User.findAll()
  .then(users => res.json(users))
  .catch(err => res.status(500).json({err}));
})

// @route POST '/users/register'
// @desc register a user
// Public
router.post('/register', (req, res) => {
  if (User.findByEmail(req.body.email)) {
    return res.status(400).json({msg: "User already exists"})
  }
  const newUser = new User(req.body)
  User.hashPassword(newUser.password_digest)
  .then(hashedPassword => {
    newUser.password_digest = hashedPassword;
  })
  .then(() => User.createToken())
  .then(newToken => newUser.token = newToken)
  .then(() => newUser.save())
  .then((user) => res.json({msg: "SUCCESS", user: user}))
})

// @route GET '/users/:id'
// @desc show a user
// Private
router.get('/:id')

// rout
// userController.findAll = (req, res) => {
//   User.findAll()
//   .then(users => {
//     res.json({
//       message: 'Success',
//       data: users
//     })
//   })
//   .catch(err => res.status(500).json({err}));
// }
//
// userController.findById = (req, res) => {
//   User.findById(req.params.id)
//   .then(user => {
//     res.json({
//       message: 'Success',
//       data: user
//     });
//   })
//   .catch(err => res.status(500).json({err}))
// }
//
// // userController.createUser = (req, res) => {
// //   User.
// // }

module.exports = router
