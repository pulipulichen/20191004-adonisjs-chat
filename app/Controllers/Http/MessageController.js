'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class MessageController {
  async list ({ request, response, view, session }) {
    // 列出最近10則訊息
    const messages = await Message.pickInverse(10).with('user')
    return messages.toJSON()
  }
  async insert ({ request, response, view, session }) {
    const query = request.post()
    console.log(query)
    if (typeof(query.message) !== 'string') {
      return false
    }
    
    let userId = session.get('userId', false)
    console.log(session.get('userId'))
    console.log(userId)
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
    return message.created_at
    //return true
  }
}

module.exports = MessageController
