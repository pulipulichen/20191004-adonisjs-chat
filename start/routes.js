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

Route.get('/user/login', 'UserController.login')
Route.get('/user/register', 'UserController.register')
Route.get('/user/logout', 'UserController.logout')
Route.get('/user/check-login', 'UserController.checkLogin')
Route.get('/user/attempt-login-via-username', 'UserController.attemptLoginViaUsername')

Route.get('/message/list', 'MessageController.list')
Route.get('/message/sync-list', 'MessageController.syncList')
Route.post('/message/insert', 'MessageController.insert')

Route.get('/oauth/request/:driver', 'UserController.oauthRequest')
Route.get('/oauth/authenticated/:driver', 'UserController.oauthAuthenticated')
Route.get('/oauth/login', 'UserController.oauthLogin')
