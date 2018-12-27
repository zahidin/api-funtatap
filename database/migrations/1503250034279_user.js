'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('device_id', 80).notNullable().unique()
      table.string('email', 254).unique()
      table.integer('combos', 10),
      table.string('cryptocurrency'),
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema