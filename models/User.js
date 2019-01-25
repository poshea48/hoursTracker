// const environment   = process.env.NODE_ENV || 'development';
// const configuration = require('../knexfile')[environment];
// const db            = require('knex')(configuration)
// const bcrypt        = require('bcrypt');
// const crypto        = require('crypto');
//
// class User {
//   constructor(obj) {
//     this.name = obj.name;
//     this.email = obj.email;
//     this.token = obj.token;
//     this.password_digest = obj.password;
//     this.created_at = new Date();
//   }
//
//   save() {
//     return db.raw(
//       "INSERT INTO users (name, email, password_digest, token, created_at) VALUES(?, ?, ?, ?, ?) RETURNING id, name, email, token, created_at",
//       [this.name, this.email, this.password_digest, this.token, this.created_at]
//     )
//     .then(data => data.rows[0])
//     .catch(err => console.log(`here: ${err}`))
//   }
//
//   static findAll() {
//     return db.raw("SELECT * FROM users")
//     .then(data => {
//       console.log(data.rows)
//       return data.rows
//     })
//     .catch(err => res.status(500).json({err: err}))
//   }
//   static findByEmail(email) {
//     return db.raw("SELECT * FROM users WHERE email = ?", [email])
//     .then(data => data.rows[0])
//     .catch(err => res.status(500).json({err: err}))
//   }
//
//   static hashPassword(password) {
//     return new Promise((resolve, reject) => {
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, (err, hash) => {
//           err ? reject(err) : resolve(hash)
//         })
//       })
//     })
//   }
//
//   static createToken() {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, data) => {
//         err ? reject(err) : resolve(data.toString('base64'))
//       })
//     })
//   }
//
// }

// User.signup = (user) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       if (err) throw err;
//       user.password_digest = hash;
//       user
//         .save()
//         .then(user => res.json(user))
//         .catch(err => console.log(`Error occured while trying to save user: ${err}`));
//     })
//   })
//   User.hashPassword(user.password)
//   .then(hashedpassword => {
//     delete user.password
//     user.password_digest = hashedPassword
//     console.log("maybe here")
//
//   })
//     .then(() => {
//       User.createToken()
//     })
//       .then(token => user.token = token)
//         .then(() => User.createUser(user))
//           .then(user => {
//             delete user.password_digest
//             res.status(201).json({user})
//           })
//           .catch(err => res.json({area: "last then", err}))
//         .catch(err => res.json({area: "createUser", err}))
//       .catch(err => res.json({area: "user.token", err}))
//     .catch(err => res.json({area: "createToken", err}))
//   .catch(err => res.status(500).json({err}))
// }
//
// User.hashPassword = password => {
//   return new Promise((resolve, reject) => {
//     console.log(bcrypt)
//     bcrypt.hash(password, 10, (err, hash) => {
//       console.log(`this is the error: ${err}`)
//       err ? reject(err) : resolve(hash)
//     })
//   })
// }
//
// User.signin = (req, res) => {
//   const userReq = req.body
//   let user;
//
//   findUser(userReq)
//   .then(foundUser => {
//     user = foundUser
//     return checkPassword(userReq.password, foundUser)
//   })
//   .then(response => createToken())
//   .then(token => updateUserToken(token, user))
//   .then(() => {
//     delete user.password_digest
//     res.status(200).json(user)
//   })
//   .catch(err => res.json(err))
// }
// // user will be saved to db - we're explicitly asking postgres to return back helpful info from the row created
// User.createUser = (user) => {
//   return database.raw(
//     "INSERT INTO users (name, email, password_digest, token, created_at) VALUES(?, ?, ?, ?, ?) RETURNING id, name, email, token, created_at",
//     [user.name, user.email, user.password_digest, user.token, new Date()]
//   )
//   .then(data => data.rows[0])
//   .catch(err => console.log(`here: ${err}`))
// }
//
// // crypto ships with node - creates a random, secure token
// User.createToken = () => {
//   return new Promise((res, rej) => {
//     crypto.randomBytes(16, (err, data) => {
//       err ? rej(err) : res(data.toString('base64'))
//     })
//   })
// }
//
// User.findByEmail = email => {
// }
//
// User.checkPassword = (reqPassword, foundUser) => {
//   return new Promise((resolve, reject) => {
//     return bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
//       if (err) {
//         reject(err)
//       } else if (response) {
//         resolve(response)
//       } else {
//         reject(new Error('Passwords do not match'))
//       }
//     })
//   })
// }
//
// User.updateToken = (token, user) => {
//   return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, email, token", [token, user.id])
//   .then((data) => data.rows[0])
// }
//
// User.authenticate = (userReq) => {
//   findByToken(userReq.token)
//   .then(user => {
//     if (user.email === userReq.email) {
//       return true
//     } else {
//       return false
//     }
//   })
// }
//
// User.findByToken = token => {
//   return database.raw("SELECT * FROM users WHERE token = ?", [token])
//   .then(data => data.rows[0])
// }
// module.exports = User;
