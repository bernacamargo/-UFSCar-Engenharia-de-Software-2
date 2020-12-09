'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('codigo')
      table.integer('id_usuario')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onDelete('NO ACTION')
      .onUpdate('CASCADE')
      table.text('produtos')
      table.float('valor_total')
      table.string('status', 50)
      table.string('entrega_rua', 100)
      table.integer('entrega_numero')
      table.string('entrega_bairro', 100)
      table.string('entrega_cidade', 100)
      table.string('entrega_estado', 100)
      table.string('entrega_cep', 100)
      table.string('entrega_complemento', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
