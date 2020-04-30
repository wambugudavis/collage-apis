'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagSchema extends Schema {
  up() {
    this.create('tags', (table) => {
      table.increments()
      table.timestamps()
      table.integer('photo_id').unsigned().notNullable();
      table.foreign('photo_id').references('Photos.id').onDelete('cascade');
      table.integer('collage_id').unsigned().notNullable();
      table.foreign('collage_id').references('Collages.id').onDelete('cascade');
    })
  }

  down() {
    this.drop('tags')
  }
}

module.exports = TagSchema
