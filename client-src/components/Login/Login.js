const axios = require('axios')

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    login() {
      console.log([this.username, this.email, this.password])
    },
    loginWithGoogle() {
      console.log('loginWithGoogle')
    },
    loginWithGitHub() {
      console.log('loginWithGitHub')
    }
  } // methods
}