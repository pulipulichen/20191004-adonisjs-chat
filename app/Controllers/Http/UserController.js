'use strict'

const User = use('App/Models/User')
const UserOAuth = use('App/Models/UserOAuth')

const Hash = use('Hash')

class UserController {
  async login ({ request, auth, origin }) {
    const query = request.get()
    
    await this.forceLogout(auth)
    return await this.attempLogin(auth, query, origin)
    
    /*
    try {
      await auth.remember(true).attempt(query.username, query.password)
      return {}
    }
    catch (error) {
      return {error: 'Login error'}
    }
    */

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
  
  async attempLogin(auth, query, origin) {
    let user = await User.findBy({
      username: query.username,
      origin: origin
    })
    
    if (user === null) {
      return {error: 'no-user'}
    }
    
    //const match = await Hash.verify(query.password, user.password)
    let p = query.passoword
    await user.ok(111)
    console.log('outside', query.password)
    let match = await user.p(query.password)
    if (match === false) {
      return {error: 'password-wrong'}
    }
    
    await this.forceLogout(auth)
    await auth.remember(true).login(user)
    return {}
  }
  
  async register({ request, response, view, session, auth, origin }) {
    const query = request.get()
    //console.log(query, origin)

    let user = await User.findBy({
      username: query.username,
      origin: origin
    })
    
    //console.log(user)

    if (user === null) {
      // 走註冊，建立使用者
      user = new User()

      user.username = query.username
      user.email = query.email
      user.password = query.password
      user.origin = origin

      let result = await user.save()
      //console.log(result)
      if (result === true) {
        //session.put('userId', user.id)
        await this.forceLogout(auth)
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
    return await this.attempLogin(auth, query, origin)
  }
  
  async forceLogout(auth) {
    try {
      await auth.check()
      await auth.logout()
    } catch (error) {}
  }
  
  async logout ({ auth }) {
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
  
  filterOrigin (request) {
    let headers = request.headers()
    let origin = headers.origin
    if (typeof(origin) !== 'string' 
            && typeof(headers.referer) === 'string') {
      origin = headers.referer.split('/').slice(0,3).join('/')
    }
    return origin
  }
  
  async checkLogin ({auth, origin}) {
    /*
    let origin = 'http://blog.pulipuli.info'
    let driver = 'github'
    let oauthID = 2345913
    
    const userOauth = await UserOAuth
      .query()
      .where('driver', driver)
      .where('oauth_id', oauthID)
      .whereHas('user', (builder) => {
        builder.where('origin', origin)
      })
      .fetch()
    
    console.log(userOauth.toJSON())
    */
    try {
      let user = await auth.getUser()
      if (user.origin === origin) {
        return user.username
      }
      else {
        await this.forceLogout(auth)
        return false
      }
    }
    catch (error) {
      return false
    }
  }
  
  async attemptLoginViaUsername ({auth, request, origin}) {
    const query = request.get()
    
    let user = await User.findBy({
      username: query.username,
      origin: origin
    })
    
    if (user === null) {
      return {error: 'no-user'}
    }
    
    await this.forceLogout(auth)
    await auth.remember(true).login(user)
    return user.username
  }
  
  async oauthRequest({ally, params}) {
    await ally.driver(params.driver).stateless().redirect()
  }
  
  async oauthAuthenticated({ally, params, request}) {
    //let origin = this.filterOrigin(request)
    let driver = params.driver
    //console.log(driver)
    let oauthUser = await ally.driver(driver).getUser()
    oauthUser = oauthUser.toJSON()
    
    return `<script>
      window.opener.postMessage({
        oauthUser: ${JSON.stringify(oauthUser)}
      }, '*')
    </script>`
  }
  
  async oauthLogin({request, auth, origin}) {
    //console.log(origin)
    
    let {driver, oauthUser} = request.get()
    oauthUser = JSON.parse(oauthUser)
    let oauthID = oauthUser.id
    //console.log(oauthID)
    // ----------------------------
    
    let user, userOauth
    userOauth = await UserOAuth
      .query()
      .where('driver', driver)
      .where('oauth_id', oauthID)
      .whereHas('user', (builder) => {
        builder.where('origin', origin)
      })
      .fetch()
    
    //console.log(userOauth.size())
    
    if (userOauth.size() > 0) {
      //console.log(userOauth.user_id)
      user = await User.find(userOauth.first().user_id)
      await auth.remember(true).login(user)
      return user.username
    }
    
    // -------------------------
    // 嘗試用email合併既有的帳號
    
    let email = oauthUser.email
    if (typeof(email) === 'string') {
      user = await User.findBy({
        email: email,
        origin: origin
      })

      if (user !== null) {
        userOauth = new UserOAuth()
        
        userOauth.driver = driver
        userOauth.oauth_id = oauthID
        //userOauth.origin = origin
        
        await user.oauths().save(userOauth)
        await auth.remember(true).login(user)
        return user.username
      }
    }
    else {
      email = oauthID + '@' + driver + '.oauth'
    }
    
    // -------------------------
    // 在這裡建立user並且嘗試登入
    user = new User()

    user.username = oauthUser.name
    if (typeof(oauthUser.nickname) === 'string') {
      user.username = oauthUser.nickname
    }
    user.username = user.username + '@' + driver
    user.email = email 
    user.origin = origin
    //user[field] = oauthID
    //user.password = oauthUser.password

    await user.save()
    
    userOauth = new UserOAuth()
        
    userOauth.driver = driver
    userOauth.oauth_id = oauthID
    //userOauth.origin = origin

    await user.oauths().save(userOauth)
    
    await this.forceLogout(auth)
    await auth.remember(true).login(user)
    return user.username
  }
}

module.exports = UserController
