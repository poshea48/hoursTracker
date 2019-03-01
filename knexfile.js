// db => hours_tracker
// table logged_work

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/hours_tracker",
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/dev"
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
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  }
};
