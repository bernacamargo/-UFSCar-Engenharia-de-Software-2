'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments()
      table.string('nome', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('senha', 60).notNullable()
      table.integer('nivel_acesso').notNullable()
      table.string('celular', 150)
      table.string('cpf', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UserSchema
