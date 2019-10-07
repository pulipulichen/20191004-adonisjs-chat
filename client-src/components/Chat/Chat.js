let Chat = {
  props: ['lib', 'status', 'config', 'progress'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      displayMessages: [],
      writingMessage: 'test: ' + location.href,
      lastUpdateTimestamp: null,
      stopSync: false,
      users: [] // for test
    }
  },
  computed: {
    
  },
  watch: {
    'displayMessages': function () {
      
      let list = this.$refs.ChatList
      //console.log(list)
      setTimeout(() => {
        list.scrollTop = list.scrollHeight
      }, 0)
    }
  },
  mounted: function () {
    this.initDisplayMessages()
    //this.loadUsers()
    //this.testSession()
  },
  destroyed: function () {
    this.stopSync = true
    //console.log('destroyed')
  },
  methods: {
    initDisplayMessages: async function () {
      let messages = await this.lib.AxiosHelper.get(`/message/list`)
      //console.log(messages.data)
      this.displayMessages = messages
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
      
      let messages = await this.lib.AxiosHelper.get(`/message/sync-list`, {
        lastUpdateTimestamp: this.lastUpdateTimestamp
      })
      if (Array.isArray(messages) === false) {
        console.error('Sync messages fail.')
        return false
      }
      
      //console.log(messages.data)
      this.displayMessages = this.displayMessages.concat(messages)
      
      this.lastUpdateTimestamp = this.getTime()
      
      setTimeout(() => {
        this.syncDisplayMessages()
      }, 5000)
    },
    getTime () {
      return (new Date()).getTime()
    },
    insert: async function () {
      /*
      let bURL = `${this.config.baseURL}/b/b`
      let b1r = await window.axios.get(bURL)
      console.log(b1r.data)
       */
      //return
      let result = await this.lib.AxiosHelper.post(`/message/insert`, {
        message: this.writingMessage
      })
      //console.log(this.writingMessage)
      //console.log(result.data)
      
      this.displayMessages.push({
        user: {
          username: this.status.username,
        },
        message: this.writingMessage,
        timestamp: result
      })
      
      this.writingMessage = ''
      
    },
    logout: async function () {
      await this.lib.AxiosHelper.get(`/user/logout`)
      this.status.username = false
      this.$router.replace('/login')
    },
    displayAge: function (timestamp) {
      return this.lib.DayJSHelper.fromNow(timestamp)
    }
  } // methods
}

export default Chat