'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RulesSchema extends Schema {
  up () {
    this.create('rules', (table) => {
      table.increments()
      table.string('partent').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rules')
  }
}

module.exports = RulesSchema
