// Update with your config settings.
// const options = process.env.NODE_ENV === 'production' ?
//   {
//     client: 'pg',
//     connection: process.env.DATABASE_URL, searchPath: ['public']
//   } : {
//     client: 'pg',
//     connection: {
//       host: 'localhost',
//       database: 'timer_log' // 'hours-log'
//   }
// const knex = require('knex')(options)
//
// module.exports = knex;

module.exports = {
  development: {
      client: 'pg',
      connection: 'postgres://localhost/hours_tracker',
      migrations: {
        directory: __dirname + '/db/migrations'
      },
      seeds: {
        directory: __dirname + '/db/seeds/dev'
      },
      useNullAsDefault: true
    },

    // test: {
    //   client: 'pg',
    //   connection:'postgres://localhost/hours-log-test',
    //   migrations: {
    //     directory: './db/migrations'
    //   },
    //   seeds: {
    //     directory: './db/seeds/test'
    //   },
    //   useNullAsDefault: true
    // },

    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: __dirname + './db/migrations'
      },
      seeds: {
        directory: __dirname + './db/seeds/production'
      },
      useNullAsDefault: true
    }
};
