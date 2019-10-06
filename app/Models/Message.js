'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (instance) => {
      instance.timestamp = (new Date()).getTime()
    })
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Message
