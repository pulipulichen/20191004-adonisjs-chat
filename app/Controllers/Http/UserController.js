'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async login ({ request, auth }) {
    const query = request.get()
    try {
      await auth.remember(true).attempt(query.username, query.password)
      return {}
    }
    catch (error) {
      return {error: 'Login error'}
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
  async logout ({ session, auth }) {
    //session.forget('userId')
    //console.log(session.get('userId'))
    //return {userId: session.get('useuser_idrId')}
    
    try {
      await auth.logout()
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
  
  async oauthGitHub({ally, request, session}) {
    // 這邊有辦法取得referer嗎？
    let referer = request.headers().referer
    //console.log(request.headers().referer)
    //console.log(referer)
    if (typeof(referer) !== 'string') {
      return false
    }
    console.log(session._sessionId)
    session.put('oauthReferer', referer)
    
    await ally.driver('github').stateless().redirect()
  }
  async oauthGitHubCallback({ally, auth, response, session}) {
    await auth.logout()
    
    let oauthUser = await ally.driver('github').getUser()
    console.log(session._sessionId)
    console.log(session.get('oauthReferer'))
    if (session.get('oauthReferer') === null) {
      return false
    }
    
    // -------------------------
    // 先找找看有沒有這個id
    oauthUser = oauthUser.toJSON()
    //console.log(oauthUser)
    
    let oauthID = oauthUser.id
    
    let user
    user = await User.findBy({
      oauth_github_id: oauthID
    })
    
    //console.log(user)
    
    if (user !== null) {
      await auth.login(user)
      //return user.id
      response.redirect(session.pull('oauthReferer'))
      return
    }
    
    // -------------------------
    // 嘗試用email合併既有的帳號
    
    let email = oauthUser.email
    user = await User.findBy({
      email: email
    })
    
    if (user !== null) {
      user.oauth_github_id = oauthID
      user.save()
      await auth.login(user)
      //return user.id
      response.redirect(session.pull('oauthReferer'))
      return
    }
    
    // -------------------------
    // 在這裡建立user並且嘗試登入
    user = new User()

    user.username = oauthUser.name
    if (typeof(oauthUser.nickname) === 'string') {
      user.username = oauthUser.nickname
    }
    user.email = oauthUser.email
    user.oauth_github_id = oauthUser.id
    //user.password = oauthUser.password

    await user.save()
    await auth.login(user)
    //return user.id
    response.redirect(session.pull('oauthReferer'))
    return
  }
}

module.exports = UserController
