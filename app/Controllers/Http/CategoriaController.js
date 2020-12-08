'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categorias
 */
const Categoria = use('App/Models/Categoria')

class CategoriaController {
  /**
   * Show a list of all categorias.
   * GET categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    try {
      const categorias = await Categoria.all()

      return response.json(categorias)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Create/save a new categoria.
   * POST categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only('nome')

    const categoria = new Categoria()

    categoria.nome = data.nome

    try {
      await categoria.save()
      const new_categoria = await Categoria.last()
      return response.json(new_categoria)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  /**
   * Display a single categoria.
   * GET categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const id = params.id

    try {
      const categoria = await Categoria.find(id)
      if(categoria)
        return response.json(categoria)
      else{
        return response.status(400).json('Categoria não encontrada')
      }  
    } catch (error) {
      console.log(error)
      return response.status(400).json(error)
    }
  }

  /**
   * Update categoria details.
   * PUT or PATCH categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id
    const data = request.only('nome')

    try {
      const categoria = await Categoria.find(id)
      if(categoria){
        categoria.nome = nome
        categoria.save()
        
        const update_categoria = await Categoria.last()
        return response.json(update_categoria)
      }
      else{
        return response.status(400).json('Categoria não encontrada')
      }

    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  /**
   * Delete a categoria with id.
   * DELETE categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = params.id

    try {
      const categoria = await Categoria.find(id)
      if(categoria){
        await categoria.delete()

        return response.json('Categoria excluída')
      }
      else{
        return response.json('Categoria não encontrada')
      }
    } catch (error) {
      console.log(error)
      return response.status(400).json(error)
    }
  }
}

module.exports = CategoriaController
