'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async login ({ request, response, view, session }) {
    const query = request.get()
    //console.log(query)

    if (typeof (query.username) !== 'string') {
      //throw 'Parameters are wrong.'
      return false
    }

    let user = await User.findBy({
      username: query.username
    })

    if (user === null) {
      session.forget('user_id')
      return {error: 'no-user'}
    }

    let userPassword = user.password

    //let queryPassword = await Hash.make(query.password)
    let queryPassword = query.password

    //console.log(queryPassword, userPassword)
    const isSame = await Hash.verify(queryPassword, userPassword)

    if (isSame) {
      //console.log(user.id)
      session.put('user_id', user.id)
      return {}
    } else {
      session.forget('user_id')
      return {
        error: 'password-wrong'
      }
    }
  }
  async register({ request, response, view, session }) {
    const query = request.get()
    //console.log(query)

    let user = await User.findBy({
      username: query.username
    })

    if (user === null) {
      // 走註冊，建立使用者
      user = new User()

      user.username = query.username
      user.email = query.email
      user.password = query.password

      let result = await user.save()
      //console.log(result)
      if (result === true) {
        session.put('user_id', user.id)
        return {}
      } else {
        session.forget('user_id')
        return {
          error: 'add-user-failed'
        }
      }
    }

    // --------------
    // 走登入

    let userPassword = user.password

    //let queryPassword = await Hash.make(query.password)
    let queryPassword = query.password

    //console.log(queryPassword, userPassword)
    const isSame = await Hash.verify(queryPassword, userPassword)

    if (isSame) {
      session.put('user_id', user.id)
      return {}
    } else {
      session.forget('user_id')
      return {
        error: 'user-is-existed'
      }
    }
  }
  logout ({ session }) {
    session.forget('user_id')
    return true
  }
  async checkLogin ({session}) {
    let userId = session.get('user_id', false)
    //console.log(session.get('user_id'))
    if (userId === false) {
      return false
    }
    
    let user = await User.find(userId)
    if (user === null) {
      return false
    }
    else {
      return user.username
    }
  }
}

module.exports = UserController
