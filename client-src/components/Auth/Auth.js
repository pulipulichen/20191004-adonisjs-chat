//const axios = require('axios')
//axios.defaults.withCredentials=true

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {
    return {}
  },
  mounted: async function () {
    if (typeof(this.config.username) !== 'string' 
            && typeof(this.config.usernameQueryURL) === 'string') {
      this.config.username = await loginComponent.methods.loadUsernameFromURL()
    }
    
    let result = false
    if (typeof(this.config.username) === 'string') {
      result = await loginComponent.methods.attemptLoginViaUsername(this.config.username)
    }
    
    if (result === false) {
      await this.checkLogin()
    }
  },
  methods: {
    loadUsernameFromURL: async function () {
      let result = await this.lib.axios.get(this.config.usernameQueryURL)
      if (typeof(result.data) === 'string') {
        return result.data
      }
    },
    attemptLoginViaUsername: async function (username) {
      var result = await this.lib.axios.get(`${this.config.baseURL}/user/attempt-login-via-username`, {
        params: {
          username: username
        }
      })
      if (typeof(result.data) === 'string') {
        this.status.username = result.data
        return true
      }
      else {
        return false
      }
    },
    checkLogin: async function () {
      
      
      var result = await this.lib.axios.get(`${this.config.baseURL}/user/check-login`)
      this.status.username = result.data
    }
  } // methods
}