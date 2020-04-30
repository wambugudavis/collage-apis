'use strict'

const Photo = use('App/Models/Photo');
const Tag = use('App/Models/Tag');

class PhotoController {
  async index({response}) {
    let photos = await Photo.query().with('user').with('collages').fetch()
    return response.json(photos)
  }

  async store({request, auth, response}) {
    if (!request.input('url') || !request.input('title')) {
      return response.badRequest('Missing parameter')
    }
    let photo = await auth.user.photos().create(request.only(['url', 'title', 'description']))
    const tags = request.input('tags');
    tags.map(async (tag) => {
      await Tag.create({
        photo_id: photo.id,
        collage_id: tag
      })
    });
    await photo.load('user');
    return response.json(photo)
  }

  async show({params, response}) {
    const photo = await Photo.findOrFail(params.id);
    await photo.load('user')
    return response.json(photo)
  }

  async highlight({response}) {
    const photo = await Photo.findOrFail(4);
    await photo.load('user')
    return response.json(photo)
  }

  async user({request, auth, response}) {
    let photos = await auth.user.photos().with('collages').fetch()
    return photos
  }

  async update({params, request, response}) {
    if (!request.input('title') || !request.input('url')) {
      return response.badRequest('Missing parameter')
    }

    const photo = await Photo.findOrFail(params.id);
    photo.merge(request.only(['title', 'url', 'description']));
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
