'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhotoSchema extends Schema {
  up() {
    this.create('photos', (table) => {
      table.increments()
      table.timestamps()
      table.string('url').notNullable()
      table.string('title').notNullable()
      table.text('description')
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('Users.id').onDelete('cascade');
    })
  }

  down() {
    this.drop('photos')
  }
}

module.exports = PhotoSchema
