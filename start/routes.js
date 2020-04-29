'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('api/photos', 'PhotoController')
  .apiOnly()
  .middleware('auth');

Route.resource('api/collages', 'CollageController')
  .apiOnly()
  .middleware('auth');

Route.resource('api/tags', 'TagController')
  .apiOnly()
  .middleware('auth');

Route.post('/auth/register', 'AuthController.register');
Route.post('/auth/login', 'AuthController.login');
Route.get('/auth/users', 'AuthController.index');
Route.get('/auth/users/:id', 'AuthController.show');
Route.put('/auth/users/:id', 'AuthController.update').middleware('auth');
Route.delete('/auth/users/:id', 'AuthController.destroy').middleware('auth');
