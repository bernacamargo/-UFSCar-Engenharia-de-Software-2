'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.string('nome', 250).notNullable()
      table.string('descricao', 500).notNullable()
      table.float('preco', 2).notNullable()
      table.integer('estoque').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutosSchema
