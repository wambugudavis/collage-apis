'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  static get hidden() {
    return ['updated_at', 'created_at']
  }

  collage() {
    return this.belongsTo('App/Models/Collage');
  }

  photo() {
    return this.belongsTo('App/Models/Photo');
  }
}

module.exports = Tag
