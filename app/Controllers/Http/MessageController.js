'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class MessageController {
  async list ({ request, response, view, session }) {
    // 列出最近10則訊息
    const messages = await Message.pickInverse(10)
    return messages.toJSON()
  }
  async insert ({ request, response, view, session }) {
    const query = request.get()
    
    if (typeof(query.message) !== 'string') {
      return false
    }
    
    let userId = session.get('user_id', false)
    if (userId === false) {
      return false
    }
    
    let user = await User.find(userId)
    
    let message = new Message()
    message.message = query.message
    
    await user.messages.save(message)
    return message.createAt
  }
}

module.exports = MessageController
