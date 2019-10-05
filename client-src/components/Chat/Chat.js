//const axios = require('axios')
//axios.defaults.withCredentials=true

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      displayMessages: [],
      writingMessage: '',
      
      users: [] // for test
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted: function () {
    this.loadUsers()
  },
  methods: {
    loadUsers: async function () {
      let users = await this.lib.axios.get('http://127.0.0.1:3333/user/all')
      this.users = users.data
    },
    initDisplayMessages: async function () {
      let messages = await this.lib.axios.get(`${this.config.baseURL}/message/list`)
      console.log(messages.data)
      this.messages = messages.data
      //console.log(this.messages)
    },
    /*
    addUser: async function () {
      let unixMS = (new Date()).getTime()
      await axios.get('http://127.0.0.1:3333/user/create', {
        params: {
          username: 'Pudding' + unixMS,
          email: 'pudding' + unixMS + '@pulipuli.info',
          password: unixMS + ''
        }
      })
      console.log('addUser')
      this.loadUsers()
    },
     */
    insert: async function () {
      let result = await this.lib.axios.get(`${this.config.baseURL}/message/insert`, {
        params: {
          message: this.message
        }
      })
      console.log(this.message)
    },
    logout: async function () {
      await this.lib.axios.get(`${this.config.baseURL}/user/logout`)
      this.status.username = ''
      this.$router.replace('/')
    }
  } // methods
}