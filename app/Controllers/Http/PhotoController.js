'use strict'

const Photo = use('App/Models/Photo');

class PhotoController {
  async index({response}) {
    let photos = await Photo.query().with('user').with('collages').fetch()
    return response.json(photos)
  }

  async store({request, auth, response}) {
    if (!request.input('url') || !request.input('title')) {
      return response.badRequest('Missing parameter')
    }
    let photo = await auth.user.photos().create(request.only(['url', 'title']))
    await photo.load('user');
    return response.json(photo)
  }

  async show({params, response}) {
    const photo = await Photo.findOrFail(params.id);
    await photo.load('user')
    return response.json(photo)
  }

  async update({params, request, response}) {
    if (!request.input('title') || !request.input('url')) {
      return response.badRequest('Missing parameter')
    }

    const photo = await Photo.findOrFail(params.id);
    photo.merge(request.only(['title', 'url']));
    await photo.save();
    await photo.load('user')
    return response.json(photo)
  }

  async destroy({params, request, response}) {
    const photo = await Photo.findOrFail(params.id)
    await photo.delete()
  }
}

module.exports = PhotoController
