'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Pedido = use('App/Models/Pedido')

/**
 * Resourceful controller for interacting with pedidos
 */
class ProdutoController {
  /**
   * Show a list of all pedidos.
   * GET pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    try {
      const pedidos =  await Pedido.all()

      return response.json(pedidos)
  
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  /**
   * Create/save a new pedido.
   * POST pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const pedidos_dados = request.only([
      'id_usuario', 
      'produtos', 
      'valor_total', 
      'entrega_rua', 
      'entrega_numero', 
      'entrega_bairro', 
      'entrega_cidade', 
      'entrega_estado', 
      'entrega_cep',
      'entrega_complemento'
    ])
    
    const pedido = new Pedido()
    
    pedido.id_usuario = pedidos_dados.id_usuario
    pedido.produtos = pedidos_dados.produtos
    pedido.valor_total = pedidos_dados.valor_total
    pedido.entrega_rua = pedidos_dados.entrega_rua
    pedido.entrega_numero = pedidos_dados.entrega_numero
    pedido.entrega_bairro = pedidos_dados.entrega_bairro
    pedido.entrega_cidade = pedidos_dados.entrega_cidade
    pedido.entrega_estado = pedidos_dados.entrega_estado
    pedido.entrega_cep = pedidos_dados.entrega_cep
    pedido.entrega_complemento = pedidos_dados.entrega_complemento
    pedido.status = 'Em processamento'
    pedido.codigo = 0

    try {
      await pedido.save()
      const novo_pedido = await Pedido.last()

      novo_pedido.codigo = novo_pedido.id + 3500
      
      novo_pedido.save()

      return response.json(novo_pedido)

      // const id_new_product = await Database.table('pedidos').insert(pedidos_dados)
      // const new_product = await Database.table('pedidos').where('id', id_new_product).first()
      // return response.json(new_product)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Display a single pedido.
   * GET pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const id = params.id

    try {
      const pedido = await Pedido.find(id)

      if(pedido){
        response.json(pedido)
      }
      else{
        response.status(400).send('Nenhum pedido encontrado')
      }

    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }

  }

  /**
   * Update pedido details.
   * PUT or PATCH pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id = params.id
    const pedidos_dados = request.post()
    
    try {
      const updated_product = await Database.table('pedidos').where('id', id).update(pedidos_dados)
      return response.json(updated_product)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  /**
   * Delete a pedido with id.
   * DELETE pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = params.id

    try {
      const product_deleted = await Database.table('pedidos').where('id', id).delete()
      response.json(product_deleted)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  async atualizaStatus({params, request, response}){
    const data = request.post('id_pedido')
    const status = data.status
    const id_pedido = data.id_pedido

    const pedido = await Pedido.find(id_pedido)

    pedido.status = status

    pedido.save()

    return response.json(pedido)

  }

}

module.exports = ProdutoController
