'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Photo extends Model {
  static get hidden() {
    return ['updated_at', 'user_id']
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  collages() {
    return this
      .belongsToMany('App/Models/Collage')
      .pivotTable('tags')
  }

  tags() {
    return this.hasMany('App/Models/Tag')
  }
}

module.exports = Photo
