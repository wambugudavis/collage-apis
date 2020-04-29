'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CollageSchema extends Schema {
  up () {
    this.create('collages', (table) => {
      table.increments()
      table.timestamps()
      table.string('title').notNullable()
    })
  }

  down () {
    this.drop('collages')
  }
}

module.exports = CollageSchema
