const bcrypt = require("bcryptjs");

let sample = {
  id: 1,
  name: "Sample Data",
  email: "sample@email.com",
  password_digest: process.env.sample_pass
};

bcrypt.genSalt(10, (err, salt) => {
  [paul, abigail, sample].forEach(user => {
    bcrypt.hash(user.password_digest, salt, (err, hash) => {
      if (err) throw err;
      user.password_digest = hash;
    });
  });
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([sample]);
    });
};
