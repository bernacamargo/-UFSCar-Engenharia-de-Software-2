'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosSchema extends Schema {
  up () {
    this.table('produtos', (table) => {
      // alter table
      table.integer('id_categoria')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categorias')
      .onUpdate("CASCADE")
      .onDelete("NO ACTION")
    })
  }

  down () {
    this.table('produtos', (table) => {
      // reverse alternations
      table.dropColumn('id_categoria')
    })
  }
}

module.exports = ProdutosSchema
