/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class UserTraits {

  register (Model, options) {
    // Add a static method
    /*
    Model.newAdminUser = function () {
      let m = new Model()
      m.isAdmin = true
      return m
    }
     */
    Model.prototype.ok = async function (a) {
      console.log('ok', a)
      return true
    }
    
    // Add an instance method
    Model.prototype.p = async function (queryPassword) {
      //const options = _.extend({}, defaultOptions, customOptions)
      //let queryPassword = options
      console.log('p', queryPassword)
      if (typeof(queryPassword) !== 'string') {
        return false
      } 
      let userPassword = this.password
      console.log(queryPassword)
      console.log(userPassword)
      const isSame = await Hash.verify(queryPassword, userPassword)
      console.log(isSame)
      return isSame
    }
  }
}

module.exports = UserTraits