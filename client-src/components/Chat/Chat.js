//const axios = require('axios')
//axios.defaults.withCredentials=true

let axios = require('axios').default
axios.defaults.withCredentials = true
axios.defaults.credentials = 'include'

module.exports = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      displayMessages: [],
      writingMessage: 'test message',
      lastUpdateTimestamp: null,
      stopSync: false,
      users: [] // for test
    }
  },
  computed: {
    
  },
  watch: {
    /*
    'status.username': function () {
      console.log(this.status.username)
      if (this.status.username !== '') {
        this.initDisplayMessages()
      }
    }
    */
  },
  mounted: function () {
    this.initDisplayMessages()
    this.loadUsers()
    //this.testSession()
  },
  destroyed: function () {
    this.stopSync = true
    //console.log('destroyed')
  },
  methods: {
    loadUsers: async function () {
      let users = await this.lib.axios.get('http://127.0.0.1:3333/user/all')
      this.users = users.data
    },
    initDisplayMessages: async function () {
      let messages = await this.lib.axios.get(`${this.config.baseURL}/message/list`)
      //console.log(messages.data)
      this.displayMessages = messages.data
      //console.log(this.messages)
      this.lastUpdateTimestamp = this.getTime()
      
      setTimeout(() => {
        this.syncDisplayMessages()
      }, 5000)
    },
    syncDisplayMessages: async function () {
      if (this.stopSync === true) {
        return false
      }
      
      let messages = await this.lib.axios.get(`${this.config.baseURL}/message/sync-list`, {
        params: {
          lastUpdateTimestamp: this.lastUpdateTimestamp
        }
      })
      //console.log(messages.data)
      this.displayMessages = this.displayMessages.concat(messages.data)
      
      this.lastUpdateTimestamp = this.getTime()
      
      setTimeout(() => {
        this.syncDisplayMessages()
      }, 5000)
    },
    getTime () {
      return (new Date()).getTime()
    },
    testSession: async function () {
      let aURL = `${this.config.baseURL}/c`
      let bURL = `${this.config.baseURL}/b`
      
      let b1r = await window.axios.get(bURL)
      console.log(b1r.data)
      
      //await axios.get(`${this.config.baseURL}/c`, {
      await window.axios.get(aURL)
      let r = await this.lib.axios.get(bURL)
      console.log(r.data)
      return false
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
      /*
      let bURL = `${this.config.baseURL}/b/b`
      let b1r = await window.axios.get(bURL)
      console.log(b1r.data)
       */
      //return
      let result = await window.axios.post(`${this.config.baseURL}/message/insert`, {
        message: this.writingMessage
      })
      //console.log(this.writingMessage)
      console.log(result.data)
      
      this.displayMessages.push({
        user: {
          username: this.status.username,
        },
        message: this.writingMessage,
        timestamp: result.data
      })
      
      this.writingMessage = ''
    },
    logout: async function () {
      await this.lib.axios.get(`${this.config.baseURL}/user/logout`)
      this.status.username = ''
      this.$router.replace('/')
    },
    displayAge: function (timestamp) {
      return timestamp
    }
  } // methods
}