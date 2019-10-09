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

// ------------------------------------------

Route.get('/client/user/login', 'Client/UserController.login')
Route.get('/client/user/register', 'Client/UserController.register')
Route.get('/client/user/logout', 'Client/UserController.logout')
Route.get('/client/user/check-login', 'Client/UserController.checkLogin')
Route.get('/client/user/attempt-login-via-username', 'Client/UserController.attemptLoginViaUsername')

Route.get('/client/message/list', 'Client/MessageController.list')
Route.get('/client/message/sync-list', 'Client/MessageController.syncList')
Route.post('/client/message/insert', 'Client/MessageController.insert')

Route.get('/client/oauth/request/:driver', 'Client/UserController.oauthRequest')
Route.get('/client/oauth/authenticated/:driver', 'Client/UserController.oauthAuthenticated')
Route.get('/client/oauth/login', 'Client/UserController.oauthLogin')

// ---------------------------

Route.on('/admin').render('admin')
Route.get('/admin/user/list', 'Admin/UserController.list')

// ---------------------------

const Helpers = use('Helpers')

Route.post('/client/upload', async ({ request }) => {
  const profilePic = request.file('profile_pic', {
    types: ['image'],
    size: '2mb'
  })

  var name = `${new Date().getTime()}.${profilePic.subtype}`
  await profilePic.move(Helpers.publicPath('uploads'), {
    name: name,
    overwrite: true,
  },)

  if (!profilePic.moved()) {
    return profilePic.error()
  }
  return name
})