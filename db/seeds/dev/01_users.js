const bcrypt = require("bcryptjs");
let paul = {
  name: "Paul OShea",
  email: "poshea48@msn.com",
  password_digest: "thewolf"
};

let abigail = {
  name: "Abigail Machernis",
  email: "abigailmachernis@gmail.com",
  password_digest: "thegailface"
};

let sample = {
  name: "Sample Data",
  email: "sample@email.com",
  password_digest: "sample"
};

bcrypt.genSalt(10, (err, salt) => {
  [paul, abigail, sample].forEach(user => {
    bcrypt.hash(user.password_digest, salt, (err, hash) => {
      if (err) throw err;
      user.password_digest = hash;
    });
  });
});

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(abigail.password_digest, salt, (err, hash) => {
//     if (err) throw err;
//     abigail.password_digest = hash;
//   });
// });

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(newUser.password_digest, salt, (err, hash) => {
//     if (err) throw err;
//     newUser.password_digest = hash;
//   })
// })

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([paul, abigail, sample]);
    });
};
