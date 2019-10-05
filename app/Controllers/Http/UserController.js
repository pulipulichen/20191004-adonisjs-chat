'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async login ({ request, response, view }) {
    const query = request.get()
    //console.log(query)

    if (typeof (query.username) !== 'string') {
      //throw 'Parameters are wrong.'
      return false
    }

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
    } else {
      return {
        error: 'password-wrong'
      }
    }
  }
  async register( { request, response, view }) {
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
      } else {
        return {
          error: 'add-user-failed'
        }
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
    } else {
      return {
        error: 'user-is-existed'
      }
    }
  }
}

module.exports = UserController
