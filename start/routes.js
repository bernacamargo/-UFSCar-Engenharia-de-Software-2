'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  Route.get('/', 'UsuarioController.index')
  Route.get('/:id', 'UsuarioController.show')
  Route.put('/:id', 'UsuarioController.update')
  Route.delete('/:id', 'UsuarioController.destroy')
  Route.post('/', 'UsuarioController.store')
}).prefix('/usuarios')