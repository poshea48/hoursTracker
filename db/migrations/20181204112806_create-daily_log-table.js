
exports.up = function(knex, Promise) {
  return
  // return Promise.all([
  //   knex.schema.createTable('users', table => {
  //     table.increments('id').primary()
  //     table.string('name').notNullable();
  //     table.string('email').unique().notNullable();
  //     table.string('token')
  //     table.string('password_digest')
  //     table.timestamp('created_at').defaultTo(knex.fn.now());
  //     table.timestamp('updated_at').defaultTo(knex.fn.now());
  //   }),
  //   knex.schema.createTable('logged_work', table => {
  //     table.increments('id').primary()
  //     table.integer('user_id').references('users.id')
  //     table.integer('hrs_worked')
  //     table.date('log_day').defaultTo(knex.fn.now())
  //     table.string('memo').defaultTo('n/a')
  //   }),
  //   knex.schema.createTable('archive_months', table => {
  //     table.increments();
  //     table.integer('user_id').references('users.id');
  //     table.integer('month');
  //     table.integer('year');
  //     table.integer('hrs_worked')
  //   })
  // ])
}

exports.down = function(knex, Promise) {
  return
  // return Promise.all([
  //   knex.schema.dropTable('users')
  // ])
}
