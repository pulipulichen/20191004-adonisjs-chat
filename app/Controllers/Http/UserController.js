'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async login ({ request, response, view, session, auth }) {
    const query = request.all()
    try {
      await auth.remember(true).attempt(query.username, query.password)
      return {}
    }
    catch (error) {
      return {error}
    }

    /*
    let user = await User.findBy({
      username: query.username
    })

    if (user === null) {
      //session.forget('userId')
      return {error: 'no-user'}
    }

    let queryPassword = query.password
    const isSame = await user.validatePassword(queryPassword)
    
    if (isSame) {
      //console.log('login', user.id)
      //session.put('userId', user.id)
      return {}
    } else {
      session.forget('userId')
      return {
        error: 'password-wrong'
      }
    }
    */
  }
  async register({ request, response, view, session, auth }) {
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
        //session.put('userId', user.id)
        await auth.remember(true).login(user)
        return {}
      } else {
        //session.forget('userId')
        return {
          error: 'add-user-failed'
        }
      }
    }

    // --------------
    // 走登入
    
    try {
      await auth.remember(true).attempt(query.username, query.password)
      return {}
    }
    catch (error) {
      return {error}
    }
    /*
    //let queryPassword = await Hash.make(query.password)
    let queryPassword = query.password
    const isSame = await user.validatePassword(queryPassword)

    if (isSame) {
      session.put('userId', user.id)
      return {}
    } else {
      session.forget('userId')
      return {
        error: 'user-is-existed'
      }
    }
    */
  }
  logout ({ session, auth }) {
    //session.forget('userId')
    //console.log(session.get('userId'))
    //return {userId: session.get('useuser_idrId')}
    
    try {
      auth.logout()
      return true
    }
    catch (error) {
      return {error}
    }
  }
  async checkLogin ({auth, session}) {
    /*
    let userId = session.get('userId', false)
    console.log('check-login',session.get('userId'))
     */
    try {
      let user = await auth.getUser()
      return user.username
    }
    catch (error) {
      return false
    }
    /*
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
     */
  }
}

module.exports = UserController
