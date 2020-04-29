'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhotoSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.increments()
      table.timestamps()
      table.string('url')
      table.string('title')
      table.integer('user_id').unsigned().references('id').inTable('users');
    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = PhotoSchema
