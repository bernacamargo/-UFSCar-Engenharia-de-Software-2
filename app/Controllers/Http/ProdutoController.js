'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    try {
      const produtos =  await Database.table('produtos')

      return response.json(produtos)
  
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const produtos_dados = request.only(['nome', 'descricao', 'preco', 'estoque'])
    
    try {
      const id_new_product = await Database.table('produtos').insert(produtos_dados)
      const new_product = await Database.table('produtos').where('id', id_new_product).first()
      return response.json(new_product)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const id = params.id

    try {
      const produto = await Database.table('produtos').where('id', id).first()

      if(produto){
        response.json(produto)
      }
      else{
        response.status(400).send('Nenhum produto encontrado')
      }

    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id
    const produtos_dados = request.only(['nome', 'descricao', 'preco', 'estoque'])

    try {
      const updated_product = await Database.table('produtos').where('id', id).update(produtos_dados)
      return response.json(updated_product)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = params.id

    try {
      const product_deleted = await Database.table('produtos').where('id', id).delete()
      response.json(product_deleted)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }
}

module.exports = ProdutoController
