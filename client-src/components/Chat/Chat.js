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
      writingMessage: 'aaa',
      
      users: [] // for test
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted: function () {
    //this.loadUsers()
    
    //this.testSession()
  },
  methods: {
    loadUsers: async function () {
      let users = await this.lib.axios.get('http://127.0.0.1:3333/user/all')
      this.users = users.data
    },
    initDisplayMessages: async function () {
      let messages = await this.lib.axios.get(`${this.config.baseURL}/message.list`)
      console.log(messages.data)
      this.messages = messages.data
      //console.log(this.messages)
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
      let bURL = `${this.config.baseURL}/b`
      let b1r = await window.axios.get(bURL)
      console.log(b1r.data)
      //return
      let result = await window.axios.post(`${this.config.baseURL}/message.insert`, {
        message: this.writingMessage
      })
      //console.log(this.writingMessage)
      console.log(result.data)
    },
    logout: async function () {
      await this.lib.axios.get(`${this.config.baseURL}/user/logout`)
      this.status.username = ''
      this.$router.replace('/')
    }
  } // methods
}