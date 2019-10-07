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

Route.get('/client/user/login', 'ClientUserController.login')
Route.get('/client/user/register', 'ClientUserController.register')
Route.get('/client/user/logout', 'ClientUserController.logout')
Route.get('/client/user/check-login', 'ClientUserController.checkLogin')
Route.get('/client/user/attempt-login-via-username', 'ClientUserController.attemptLoginViaUsername')

Route.get('/client/message/list', 'ClientMessageController.list')
Route.get('/client/message/sync-list', 'ClientMessageController.syncList')
Route.post('/client/message/insert', 'ClientMessageController.insert')

Route.get('/oauth/request/:driver', 'ClientUserController.oauthRequest')
Route.get('/oauth/authenticated/:driver', 'ClientUserController.oauthAuthenticated')
Route.get('/oauth/login', 'ClientUserController.oauthLogin')
