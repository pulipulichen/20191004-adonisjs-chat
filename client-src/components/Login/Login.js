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
      errorMessage: ''
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
    loginFromGoogle() {
      console.log('loginWithGoogle')
    },
    loginFromGitHub() {
      let win = window.open(`${this.config.baseURL}/oauth/github`, '_blank')
      let timer = setInterval(async () => { 
        if (win.closed) {
          clearInterval(timer);
          
          let result = await this.lib.axios.get(`${this.config.baseURL}/user/check-login`, {
            withCredentials: false
          })
          
          console.log(result.data)
          if (result.data !== false) {
            this.status.username = result.data
            this.$router.replace('/chat')
          }
        }
      }, 1000);
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  } // methods
}