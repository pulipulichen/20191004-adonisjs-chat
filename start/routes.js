'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

const Database = use('Database')
const User = use('App/Models/User')

Route.get('/user/all', async () => {
  let users = await User.all()
  return users
  //return {'aaa': 'ok'}
  
  //return await Database.select('*').from('users')
})

Route.get('/user/create', async ({ request, response, view }) => {
  const query = request.get()
  //console.log(query)
  
  const user = new User()

  user.username = query.username
  user.email = query.email
  user.password = query.password

  return await user.save()
  //return {'aaa': 'ok'}
})

const Hash = use('Hash')

Route.get('/login', async ({ request, response, view }) => {
  const query = request.get()
  //console.log(query)
  
  let user = await User.findBy({
    username: query.username
  })
  
  if (user === null) {
    return {error: 'no-user'}
  }
  
  let userPassword = user.password
  
  //let queryPassword = await Hash.make(query.password)
  let queryPassword = query.password
  
  //console.log(queryPassword, userPassword)
  const isSame = await Hash.verify(queryPassword, userPassword)
  
  if (isSame) {
    return {}
  }
  else {
    return {error: 'password-wrong'}
  }
  //console.log(isSame)
  //return {error: 'testing'}
  /*
  let user = await User.findBy({
    username: query.username,
    password: password,
  })

  console.log(password)
  console.log(user)
  
  let output = {}

  if (user === null) {
    user = await User.findBy({
      username: query.username
    })
    
    if (user === null) {
      output.error = 'no-user'
    }
    else {
      output.error = 'password-wrong'
    }
  }

  return output
   */
})

Route.get('/register', async ({ request, response, view }) => {
  const query = request.get()
  //console.log(query)
  
  let user = await User.findBy({
    username: query.username
  })
  
  if (user === null) {
    user = new User()

    user.username = query.username
    user.email = query.email
    user.password = query.password

    let result = await user.save()
    //console.log(result)
    if (result === true) {
      return {}
    }
    else {
      return {error: 'add-user-failed'}
    }
  }
  
  // --------------
  
  let userPassword = user.password
  
  //let queryPassword = await Hash.make(query.password)
  let queryPassword = query.password
  
  //console.log(queryPassword, userPassword)
  const isSame = await Hash.verify(queryPassword, userPassword)
  
  if (isSame) {
    return {}
  }
  else {
    return {error: 'user-is-existed'}
  }
  
  /*
  let password = await Hash.make(query.password)
  
  let user = await User.findBy({
    username: query.username,
    password: password,
  })
  
  console.log(user)

  let output = {}

  if (user !== null) {
    // 表示使用者存在，且密碼正確，不用註冊
    return output
  }
  else {
    user = await User.findBy({
      username: query.username
    })
    
    if (user !== null) {
      output.error = 'user-is-existed'
      return output
    }
    else {
      user = new User()

      user.username = query.username
      user.email = query.email
      user.password = query.password

      let result = await user.save()
      console.log(result)
      if (result === true) {
        return output
      }
      else {
        output.error = 'add-user-failed'
        return output
      }
    }
  }
   */
})