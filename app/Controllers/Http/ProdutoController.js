'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Produto = use('App/Models/Produto')

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
      const produtos =  await Produto.all()

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
    const produtos_dados = request.only(['nome', 'descricao', 'preco', 'estoque', 'id_categoria'])
    const produto = new Produto()
    
    produto.nome = produtos_dados.nome
    produto.descricao = produtos_dados.descricao
    produto.preco = produtos_dados.preco
    produto.estoque = produtos_dados.estoque
    produto.id_categoria = produtos_dados.id_categoria

    try {
      await produto.save()
      const novo_produto = await Produto.last()
      return response.json(novo_produto)

      // const id_new_product = await Database.table('produtos').insert(produtos_dados)
      // const new_product = await Database.table('produtos').where('id', id_new_product).first()
      // return response.json(new_product)
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
    const produtos_dados = request.only(['nome', 'descricao', 'preco', 'estoque', 'id_categoria'])

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

  async getByFiltros ({request, response}) {
    const id_categoria = request.only('id_categoria') //required
    const nome = request.only('nome') //required
    const ordenacao = request.only('ordenacao') //required
    const ordenacao_direcao = request.only('ordenacao_direcao')

    if(!ordenacao_direcao)
      ordenacao_direcao = 'desc'
      
    try {
      const produtos = Database.table('produtos')

      if(id_categoria)
        produtos.where('id_categoria', id_categoria)

      if(nome)
        produtos.orWhere('nome', 'like', `%${nome}%`)
      
      await produtos.orderBy(ordenacao, ordenacao_direcao)

      return response.json(produtos)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
}

module.exports = ProdutoController
