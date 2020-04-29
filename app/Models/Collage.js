'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Collage extends Model {
  static get hidden() {
    return ['updated_at', 'created_at']
  }

  photos() {
    return this
      .belongsToMany('App/Models/Photo')
      .pivotTable('tags')
  }
}

module.exports = Collage
