//const axios = require('axios')
//axios.defaults.withCredentials=true

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      /*
      username: '',
      email: '',
      password: ''
      */
      username: 'pudding',
      email: 'pudding@nccu.edu.tw',
      password: 'test',
      mode: 'login',
      errorMessage: '',
    }
  },
  computed: {
    isEmail() {
      if (this.email.trim() === '') {
        return true
      }
      return this.validateEmail(this.email)
    },
    isLoginEnable() {
      return (this.username.trim() !== ''
              && this.password.trim() !== '')
    },
    isRegisterEnable() {
      return (this.isEmail === true 
              && this.username.trim() !== ''
              && this.email.trim() !== ''
              && this.password.trim() !== '')
    }
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    register: async function() {
      if (this.mode !== 'register') {
        this.mode = 'register'
        return false
      }
      
      //console.log([this.username, this.email, this.password])
      
      let result = await this.lib.axios.get(`${this.config.baseURL}/user/register`, {
        params: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
      
      let user = result.data
      if (typeof(user.error) === 'string') {
        if (user.error === 'user-is-existed') { 
          this.errorMessage = this.$t(`User {0} is registed.`, [this.username])
        }
        else {
          this.errorMessage = user.error
        }
        return false
      }
      else {
        //this.status.isLogin = true
        this.status.username = this.username
        this.errorMessage = ''
        this.$router.replace('chat')
      }
    },
    login: async function() {
      this.mode = 'login'
      
      //console.log([this.username, this.email, this.password])
      
      let result = await this.lib.axios.get(`${this.config.baseURL}/user/login`, {
        params: {
          username: this.username,
          password: this.password,
        }
      })
      
      let user = result.data
      //console.log(user)
      if (typeof(user.error) === 'string') {
        if (user.error === 'no-user') { 
          this.errorMessage = this.$t(`User {0} is not existed.`, [this.username])
        }
        else if (user.error === 'password-wrong') { 
          this.errorMessage = this.$t(`Password is incorrect.`, [this.username])
        }
        else {
          this.errorMessage = user.error
        }
        return false
      }
      else {
        //this.status.isLogin = true
        this.status.username = this.username
        this.errorMessage = ''
        this.$router.replace('chat')
      }
    },
    loginFromOAuth(driver) {
      //screen.availHeight
      let width = 400
      if (width > screen.availWidth) {
        width = screen.availWidth
      }
      
      let height = 600
      if (height > screen.availHeight) {
        height = screen.availHeight
      }
      
      var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

      //var screenWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      //var screenHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var screenWidth = screen.availWidth
      var screenHeight = screen.availHeight

      //var systemZoom = width / window.screen.availWidth;
      var systemZoom = 1
      var left = ((screenWidth - width) / 2) + dualScreenLeft
      var top = ((screenHeight - height) / 2) + dualScreenTop
      
      //width = width / systemZoom
      //height = height / systemZoom
      
      let win = window.open(`${this.config.baseURL}/oauth/request/${driver}`, '_blank', `location=0,menubar=no,copyhistory=no,directories=0,status=0,width=${width},height=${height},top=${top},left=${left}`)
      this.loginOAuthCallback(win)
      //this.oauthURL = `${this.config.baseURL}/oauth/request/${driver}`
    },
    loginOAuthCallback: function (win) {
      let callback = async (e) => {
        //console.log([e.origin, this.config.baseURL])
        if (e.origin !== this.config.baseURL) {
          return false
        }
        win.close()
        //this.oauthURL = false
        //let target = e.target;
        let data = e.data
        //console.log(data)
        if (typeof(data) === 'object') {
          let result = await this.lib.axios.get(`${this.config.baseURL}/oauth/login`, {
            params: data
          })
          //console.log(result.data)
          if (result.data !== false) {
            this.status.username = result.data
            //this.$router.replace('/chat')
          }
        }
        window.removeEventListener('message', callback, false)
      }
      window.addEventListener('message', callback, false);
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  } // methods
}