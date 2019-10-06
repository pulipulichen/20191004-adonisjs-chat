//const axios = require('axios')
//axios.defaults.withCredentials=true

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {
    return {}
  },
  mounted: async function () {
    //console.log(this.config)
    if (typeof(this.config.username) !== 'string' 
            && typeof(this.config.usernameQueryURL) === 'string') {
      this.config.username = await this.loadUsernameFromURL()
    }
    
    let result = false
    if (typeof(this.config.username) === 'string') {
      result = await this.attemptLoginViaUsername(this.config.username)
    }
    
    if (result === false) {
      await this.checkLogin()
    }
  },
  methods: {
    loadUsernameFromURL: async function () {
      //console.log(this.config.usernameQueryURL)
      let result = await this.lib.axios.get(this.config.usernameQueryURL)
      //console.log(result.data)
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