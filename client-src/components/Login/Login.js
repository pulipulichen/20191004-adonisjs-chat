const axios = require('axios')

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
      
      console.log([this.username, this.email, this.password])
      
      let result = await axios.get('http://127.0.0.1:3333/register', {
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
        this.status.isLogin = true
        this.status.username = this.username
        this.errorMessage = ''
        this.$router.push('chat')
      }
    },
    login: async function() {
      this.mode = 'login'
      
      console.log([this.username, this.email, this.password])
      
      let result = await axios.get('http://127.0.0.1:3333/login', {
        params: {
          username: this.username,
          password: this.password,
        }
      })
      
      let user = result.data
      
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
        this.status.isLogin = true
        this.status.username = this.username
        this.errorMessage = ''
        this.$router.push('chat')
      }
    },
    loginWithGoogle() {
      console.log('loginWithGoogle')
    },
    loginWithGitHub() {
      console.log('loginWithGitHub')
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  } // methods
}