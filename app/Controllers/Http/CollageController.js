'use strict'

const Collage = use('App/Models/Collage');

class CollageController {
  async index({response}) {
    let collages = await Collage.query().with('photos').fetch()
    return response.json(collages)
  }

  async store({request, response}) {
    if (!request.input('title')) {
      return response.badRequest({message: 'Missing parameter'})
    }
    let collage = await Collage.create(request.all())
    return response.json(collage)
  }

  async show({params, response}) {
    const collage = await Collage.findOrFail(params.id);
    return response.json(collage)
  }

  async update({params, request, response}) {
    if (!request.input('title')) {
      return response.badRequest('Missing parameter')
    }

    const collage = await Collage.findOrFail(params.id);
    collage.merge(request.only(['title']));
    await collage.save();
    // await photo.load('user')
    return response.json(collage)
  }

  async destroy({params}) {
    const collage = await Collage.findOrFail(params.id)
    await collage.delete()
  }
}

module.exports = CollageController
