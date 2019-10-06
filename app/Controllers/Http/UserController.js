'use strict'

const User = use('App/Models/User')
const UserOAuth = use('App/Models/UserOAuth')

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
  
  /*
  async oauthGitHub({ally}) {
    await ally.driver('github').stateless().redirect()
  }
  async oauthGitHubCallback({ally}) {
    let returnScript = await this.oauthCallback(ally, 'github', 'oauth_github_id')
    return returnScript
  }
  
  async oauthGoogle({ally}) {
    await ally.driver('google').stateless().redirect()
  }
  async oauthGoogleCallback({ally}) {
    let returnScript = await this.oauthCallback(ally, 'google', 'oauth_google_id')
    return returnScript
  }
  
  async oauthInstagram({ally}) {
    await ally.driver('instagram').stateless().redirect()
  }
  async oauthInstagramCallback({ally}) {
    let returnScript = await this.oauthCallback(ally, 'instagram', 'oauth_instagram_id')
    return returnScript
  }
  
  async oauthFoursquare({ally}) {
    await ally.driver('foursquare').stateless().redirect()
  }
  async oauthFoursquareCallback({ally}) {
    let returnScript = await this.oauthCallback(ally, 'foursquare', 'oauth_foursquare_id')
    return returnScript
  }
  
  async oauthLinkedIn({ally}) {
    await ally.driver('linkedin').stateless().redirect()
  }
  async oauthLinkedInCallback({ally}) {
    let returnScript = await this.oauthCallback(ally, 'linkedin', 'oauth_linkedin_id')
    return returnScript
  }
   */
  
  async oauthRequest({ally, params}) {
    await ally.driver(params.driver).stateless().redirect()
  }
  
  async oauthAuthenticated({ally, params}) {
    let driver = params.driver
    //console.log(driver)
    let oauthUser = await ally.driver(driver).getUser()
    
    // -------------------------
    // 先找找看有沒有這個id
    oauthUser = oauthUser.toJSON()
    //console.log(oauthUser)
    
    let oauthID = oauthUser.id
    let returnScript = `
    <script>
      window.opener.postMessage({
        driver: '${driver}',
        oauthID: ${oauthID}
      }, '*')
    </script>`
    //console.log(oauthID)
    
    let user, userOauth
    userOauth = await UserOAuth.findBy({
      driver: driver,
      oauth_id: oauthID
    })
    
    //console.log(user)
    
    if (userOauth !== null) {
      return returnScript
    }
    
    // -------------------------
    // 嘗試用email合併既有的帳號
    
    let email = oauthUser.email
    if (typeof(email) === 'string') {
      user = await User.findBy({
        email: email
      })

      if (user !== null) {
        userOauth = new UserOAuth()
        
        userOauth.driver = driver
        userOauth.oauth_id = oauthID
        
        await user.oauths().save(userOauth)
        return returnScript
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
    //user[field] = oauthID
    //user.password = oauthUser.password

    await user.save()
    
    userOauth = new UserOAuth()
        
    userOauth.driver = driver
    userOauth.oauth_id = oauthID

    await user.oauths().save(userOauth)
    
    return returnScript
  }
  
  async oauthLogin({request, auth}) {
    let {driver, oauthID} = request.get()
    //console.log([field, oauthID])
    //console.log(typeof(oauth_github_id))
    if (typeof(oauthID) === 'undefined' || typeof(driver) === 'undefined') {
      return false
    }
    if (typeof(oauthID) === 'string') {
      oauthID = parseInt(oauthID, 10)
    }
    
    let userOauth = await UserOAuth.findBy({
      driver: driver,
      oauth_id: oauthID
    })
    
    //console.log(user.id)
    if (userOauth !== null) {
      let user = await userOauth.user().fetch()
      try {
        await auth.login(user)
      }
      catch (error) {}
      return user.username
    }
    else {
      return false
    }
  }
}

module.exports = UserController
