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
      email: 'blog@pulipuli.info',
      password: 'test'
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
    register() {
      console.log([this.username, this.email, this.password])
      this.$router.push('chat/' + this.username)
    },
    login() {
      console.log([this.username, this.email, this.password])
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