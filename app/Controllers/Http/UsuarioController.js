'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

/**
 * Resourceful controller for interacting with usuarios
 */
class UsuarioController {
  /**
   * Show a list of all usuarios.
   * GET usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    try {
      const usuarios =  await Database.table('usuarios')

      return response.json(usuarios)
  
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  /**
   * Create/save a new usuario.
   * POST usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const usuarios_dados = request.only(['nome', 'email', 'senha', 'nivel_acesso', 'celular', 'cpf'])
    console.log(usuarios_dados)
    try {
      const created_user = await Database.table('usuarios').insert(usuarios_dados)

      return response.json(created_user)

    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Display a single usuario.
   * GET usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const id = params.id

    try {
      
      const usuario = await Database.table('usuarios').where('id', id).first()

      if(usuario){
        response.json(usuario)
      }
      else{
        response.status(400).send('Nenhum usuário encontrado')
      }

    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  /**
   * Update usuario details.
   * PUT or PATCH usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id
    const usuarios_dados = request.only(['nome', 'email', 'celular'])

    try {
      const updated_user = await Database.table('usuarios').where('id', id).update(usuarios_dados)

      return response.json(updated_user)

    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Delete a usuario with id.
   * DELETE usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const id = params.id

    try {
      const user_deleted = await Database.table('usuarios').where('id', id).delete()

      response.json(user_deleted)

    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }
}

module.exports = UsuarioController
