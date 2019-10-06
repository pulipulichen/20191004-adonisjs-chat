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

// -----------------------------------------

Route.get('/user/login', 'UserController.login')
Route.get('/user/register', 'UserController.register')
Route.get('/user/logout', 'UserController.logout')
Route.get('/user/check-login', 'UserController.checkLogin')
Route.get('/user/attempt-login-via-username', 'UserController.attemptLoginViaUsername')

Route.get('/message/list', 'MessageController.list')
Route.get('/message/sync-list', 'MessageController.syncList')
Route.post('/message/insert', 'MessageController.insert')

//Route.get('/message/test', 'MessageController.test')

// ------------------------------------

Route.get('/oauth/request/:driver', 'UserController.oauthRequest')
Route.get('/oauth/authenticated/:driver', 'UserController.oauthAuthenticated')
Route.get('/oauth/login', 'UserController.oauthLogin')

/*
Route.get('/oauth/github', 'UserController.oauthGitHub')
Route.get('/oauth/github/authenticated', 'UserController.oauthGitHubCallback')

Route.get('/oauth/google', 'UserController.oauthGoogle')
Route.get('/oauth/google/authenticated', 'UserController.oauthGoogleCallback')

Route.get('/oauth/instagram', 'UserController.oauthInstagram')
Route.get('/oauth/instagram/authenticated', 'UserController.oauthInstagramCallback')

Route.get('/oauth/foursquare', 'UserController.oauthFoursquare')
Route.get('/oauth/foursquare/authenticated', 'UserController.oauthFoursquareCallback')

Route.get('/oauth/linkedin', 'UserController.oauthLinkedIn')
Route.get('/oauth/linkedin/authenticated', 'UserController.oauthLinkedInCallback')

Route.get('/oauth/login', 'UserController.oauthLogin')
 */

// ----------------
// For session test

Route.get('/a/a', ({ session, request, response }) => {
  //console.log(session._driverInstance.Store._sessionID)
  console.log(request.header('cookie'))
  session.put('a', 'a')
  //response.redirect('/b/b')
  return `<a href="/b/b">/b/b</a> <br />
  <a href="/a/b">/a/b</a>`
})

Route.get('/d.d', ({ session, request, response }) => {
  //console.log(session._driverInstance.Store._sessionID)
  //console.log(request.header('cookie'))
  session.forget('a', {
    path: '/'
  })
  //session.forget('user_id')
  //session.commit()
  let result = session.get('a') // 'virk'
  console.log('d', result)
  return result
})


Route.get('/c.c', async ({ auth, session, request, response }) => {
  await auth.logout()
  await auth.remember(true).attempt('pudding', 'test')
  var user = await auth.getUser()
  console.log('c.c user.id', user.id)
  
  //console.log(session._driverInstance.Store._sessionID)
  //console.log(request.header('cookie'))
  session.put('a', 'aaa')
  await session.commit()
  //session.commit()
  let result = session.get('a') // 'virk'
  console.log('c', result)
  return result
  
})

Route.get('/b.b', async ({ session, request, auth }) => {
  var user = await auth.getUser()
  console.log('b user.id', user.id)
  
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

Route.get('/sub1/a', ({ session, request }) => {
  //console.log(request.header('cookie'))
  session.put('sub1-a', 'ok') // 'virk'
  let result = session.get('sub1-a') // 'virk'
  console.log('sub a', result)
  return result
})

Route.get('/sub1/b', ({ session, request }) => {
  //console.log(request.header('cookie'))
  let result = session.get('sub1-a') // 'virk'
  console.log('sub1 b', result)
  if (result !== null) {
    return 'same path: ' + result // 'virk'
  }
  else {
    return 'no result'
  }
})

Route.get('/sub2/b', ({ session, request }) => {
  //console.log(request.header('cookie'))
  let result = session.get('sub1-a') // 'virk'
  console.log('sub2 b', result)
  if (result !== null) {
    return 'diff path: ' + result // 'virk'
  }
  else {
    return 'no result'
  }
})

Route.get('/sub2/c', ({ session, request }) => {
  //console.log(request.header('cookie'))
  session.forget('sub1-a')
  let result = session.get('sub1-a') // 'virk'
  console.log('sub2 b', result)
  if (result !== null) {
    return 'diff path: ' + result // 'virk'
  }
  else {
    return 'no result'
  }
})



Route.get('/sub1.a', ({ session, request }) => {
  //console.log(request.header('cookie'))
  session.put('sub2-a', 'ok') // 'virk'
  let result = session.get('sub2-a') // 'virk'
  console.log('sub a', result)
  return result
})

Route.get('/sub1.b', ({ session, request }) => {
  //console.log(request.header('cookie'))
  let result = session.get('sub2-a') // 'virk'
  console.log('sub1 b', result)
  if (result !== null) {
    return 'same path: ' + result // 'virk'
  }
  else {
    return 'no result'
  }
})

Route.get('/sub2.b', ({ session, request }) => {
  //console.log(request.header('cookie'))
  let result = session.get('sub2-a') // 'virk'
  console.log('sub2 b', result)
  if (result !== null) {
    return 'diff path: ' + result // 'virk'
  }
  else {
    return 'no result'
  }
})
