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

Route.get('/user.login', 'UserController.login')
Route.get('/user.register', 'UserController.register')
Route.get('/user.logout', 'UserController.logout')
Route.get('/user.check-login', 'UserController.checkLogin')

Route.get('/message.list', 'MessageController.list')
Route.post('/message.insert', 'MessageController.insert')

Route.get('/a/a', ({ session, request, response }) => {
  //console.log(session._driverInstance.Store._sessionID)
  console.log(request.header('cookie'))
  session.put('a', 'a')
  //response.redirect('/b/b')
  return `<a href="/b/b">/b/b</a> <br />
  <a href="/a/b">/a/b</a>`
})


Route.get('/c/c', ({ session, request, response }) => {
  //console.log(session._driverInstance.Store._sessionID)
  //console.log(request.header('cookie'))
  session.put('a', 'aaa')
  //session.commit()
  let result = session.get('a') // 'virk'
  console.log('c', result)
})

Route.get('/b/b', ({ session, request }) => {
  //console.log(request.header('cookie'))
  let result = session.get('a') // 'virk'
  console.log('b', result)
  if (result !== null) {
    return result // 'virk'
  }
  else {
    return 'no result'
  }
})

Route.get('/a/b', ({ session, request }) => {
  //console.log(request.header('cookie'))
  let result = session.get('a') // 'virk'
  console.log('b', result)
  if (result !== null) {
    return 'same path: ' + result // 'virk'
  }
  else {
    return 'no result'
  }
})