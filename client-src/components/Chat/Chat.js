const axios = require('axios')

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
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
    }
  } // methods
}