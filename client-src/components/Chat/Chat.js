const axios = require('axios')

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      displayMessages: [],
      writingMessage: '',
      users: []
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
      let users = await axios.get('http://127.0.0.1:3333/user/all')
      this.users = users.data
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
    send: async function () {
      console.log(this.message)
    },
    logout: async function () {
      await axios.get(`${this.config.baseURL}/logout`)
      this.status.username = ''
      this.$router.replace('/')
    }
  } // methods
}