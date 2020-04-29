'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Photo = use('App/Models/Photo');

/**
 * Resourceful controller for interacting with photos
 */
class PhotoController {
  /**
   * Show a list of all photos.
   * GET photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
    let photos = await Photo.query().with('user').fetch()
    return response.json(photos)
  }

  /**
   * Create/save a new photo.
   * POST photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
    if (!request.input('url') || !request.input('title')) {
      return response.badRequest('Missing parameter')
    }

    const photo = await Photo.create(request.only(['url', 'title']));
    return response.json(photo)
  }

  /**
   * Display a single photo.
   * GET photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params}) {
    return await Photo.findOrFail(params.id);
  }

  /**
   * Update photo details.
   * PUT or PATCH photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
    if (!request.input('title') || !request.input('url')) {
      return response.badRequest('Missing parameter')
    }

    const photo = await Photo.findOrFail(params.id);
    photo.merge(request.only(['title', 'url']));
    await photo.save();
  }

  /**
   * Delete a photo with id.
   * DELETE photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
    const photo = await Photo.findOrFail(params.id)
    await photo.delete()
  }
}

module.exports = PhotoController
