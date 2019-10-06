//const axios = require('axios')
//axios.defaults.withCredentials=true

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
  },
  mounted: async function () {
    await this.checkLogin()
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
      //console.log(result.data)
      /*
      var result = await this.lib.axios.get(`${this.config.baseURL}/user/logout`)
      console.log(result.data)
      
      // 這時候不應該有登入記錄了！！！
      var result = await this.lib.axios.get(`${this.config.baseURL}/user/check-login`)
      console.log(result.data)
      */
      this.status.username = result.data
      /*
      let path = this.$router.currentRoute.fullPath
      
      if (result.data === false) {
        if (path !== '/login') {
          this.$router.replace('/login')
        }
      }
      else {
        this.status.username = result.data
        if (path !== '/chat') {
          this.$router.replace('/chat')
        }
      }
       */
    }
  } // methods
}