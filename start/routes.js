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

Route.get('/login', 'UserController.login')
Route.get('/register', 'UserController.register')
Route.get('/logout', 'UserController.logout')
Route.get('/check-login', 'UserController.checkLogin')
