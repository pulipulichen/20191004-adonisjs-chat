'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class MessageController {
  async list ({ request, response, view, session }) {
    // 列出最近10則訊息
    const messages = await Message.list(10)
    //await messages.user().fetch()
    return messages.toJSON().reverse()
  }
  async syncList ({ request, response, view, session }) {
    const query = request.get()
    let lastUpdateTimestamp = query.lastUpdateTimestamp
    //console.log(lastUpdateTimestamp)
    if (isNaN(lastUpdateTimestamp) === true) {
      return []
    }
    lastUpdateTimestamp = parseInt(lastUpdateTimestamp, 10)
    
    let userId = session.get('userId', false)
    
    let messages = await Message
            .query()
            .where('user_id', '<>', userId)
            .where('timestamp', '>', lastUpdateTimestamp)
            .with('user')
            .fetch()
    
    return messages.toJSON()
  }
  async insert ({ request, response, view, session }) {
    const query = request.post()
    //console.log(query)
    if (typeof(query.message) !== 'string') {
      return false
    }
    
    let userId = session.get('userId', false)
    //console.log(session.get('userId'))
    //console.log(userId)
    if (userId === false) {
      //userId = 1
      return false
    }
    
    let user = await User.find(userId)
    if (user === null) {
      return false
    }
    
    let message = new Message()
    message.message = query.message
    await user.messages().save(message)
    
    //await message.reload()
    //console.log(message.toJSON().created)
    return message.timestamp
    //return true
  }
}

module.exports = MessageController
