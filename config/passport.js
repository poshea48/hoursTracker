// Create passport Strategy to extract payload - user data
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const db = require('../db/knex')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      db.select().from('users').where({id: jwt_payload.id})
        .then(data => {
          let user = data[0]
          if (user) {
            return done(null, user)
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}
