'use strict'

const Tag = use('App/Models/Tag');

class TagController {
  async index({response}) {
    let tags = await Tag.all()
    return response.json(tags)
  }

  async store({request, response}) {
    if (!request.input('photo_id') || !request.input('collage_id')) {
      return response.badRequest({message: 'Missing parameter'})
    }
    let tag = await Tag.create(request.all())
    return response.json(tag)
  }

  async show({params, response}) {
    const tag = await Tag.findOrFail(params.id);
    return response.json(tag)
  }

  async update({params, request, response}) {
    if (!request.input('photo_id') || !request.input('collage_id')) {
      return response.badRequest({message: 'Missing parameter'})
    }

    const tag = await Tag.findOrFail(params.id);
    tag.merge(request.only(['photo_id', 'collage_id']));
    await tag.save();
    // await photo.load('user')
    return response.json(tag)
  }

  async destroy({params}) {
    const tag = await Tag.findOrFail(params.id)
    await tag.delete()
  }
}

module.exports = TagController
