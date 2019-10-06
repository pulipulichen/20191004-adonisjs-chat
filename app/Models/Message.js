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
  
  static async list (limit = 10) {
    let transaction = Message
            .query()
            .with('user')
    
    let messages
    if (typeof(limit) !== 'number') {
      messages = await transaction.fetch()
    }
    else {
      messages = await transaction.pickInverse(10)
    }
    return messages
  }
  
  /*
  static get computed() {
    return ['username']
  }
  
  async getUsername() {
    let user = await this.belongsTo('App/Models/User').fetch()
    console.log(user.username)
    //console.log(user.toJSON())
    //return user.username
    return user.username
  }
   */
}

module.exports = Message
