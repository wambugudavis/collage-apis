'use strict'

const User = use('App/Models/User');

class AuthController {
  async register({request, auth, response}) {
    let user = await User.create(request.all())
    let accessToken = await auth.generate(user)
    return response.json({"user": user, "access_token": accessToken})
  }

  async login({request, auth, response}) {
    const email = request.input("email")
    const password = request.input("password");
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
      }

    } catch (e) {
      return response.json({message: 'User not registered!'})
    }
  }

  async index({response}) {
    let users = await User.all()
    return response.json(users)
  }

  async show({params}) {
    return await User.findOrFail(params.id);
  }

  async update({params, request, response}) {
    const user = await User.findOrFail(params.id);
    user.merge(request.only(['username', 'location', 'bio']));
    await user.save();
    return response.json(user)
  }

  async destroy({params}) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}

module.exports = AuthController
