'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class MessageController {
  /**
   * 列出最近10則訊息
   */
  async list ({ origin }) {
    const messages = await Message.list(origin, 10)
    return messages.toJSON().reverse()
  }
  
  async syncList ({ request, auth, origin }) {
    const query = request.get()
    let lastUpdateTimestamp = query.lastUpdateTimestamp
    if (isNaN(lastUpdateTimestamp) === true) {
      return []
    }
    lastUpdateTimestamp = parseInt(lastUpdateTimestamp, 10)
    
    let user = await auth.getUser()
    let userId = user.id
    
    let messages = await Message
            .query()
            .where('user_id', '<>', userId)
            .where('timestamp', '>', lastUpdateTimestamp)
            .with('user')
            .whereHas('user', (builder) => {
              builder.where('origin', origin)
            })
            .fetch()
    
    return messages.toJSON()    
  }
  async insert ({ request, auth }) {
    const query = request.post()
    if (typeof(query.message) !== 'string') {
      return false
    }
    
    let user = await auth.getUser()
    let userId = user.id
    if (userId === false) {
      return false
    }
    
    let message = new Message()
    message.message = query.message
    await user.messages().save(message)
    return message.timestamp
  }
}

module.exports = MessageController
