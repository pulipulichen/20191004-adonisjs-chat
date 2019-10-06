import Vue from 'vue'
Vue.config.devtools = false

const config = require('./config.js')
require('./styles/global.less')

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import i18n from './VueI18n'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
//import router from 'router.js'

import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.credentials = 'include'
window.axios = axios

// --------------------
import routes from './routes'

// --------------------
// Components

import Chat from './components/Chat/Chat.vue'

// ----------------------

let $ = require('jquery')

// -----------------------
// 確認 baseURL

let baseURL
let baseScript = $('script#ChatAPP:first')
if (baseScript.length === 1) {
  baseURL = baseScript.attr('src').split('/').slice(0, 3).join('/')
  //console.log(baseURL)
  config.baseURL = baseURL
}

// -----------------------

$('body').append(`<div id="app"></div>`)

// -----------------------

let VueController = {
  el: '#app',
  i18n: i18n,
  template: `
  <div class="non-invasive-web-style-framework">
    <router-view v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"></router-view>
  </div>
`,
  data: {
    config: config,
    loginChecked: false,
    status: {
      message: 'Hello world.',
      username: '',
      //isLogin: false
    },
    progress: {
      component: false,
      data: false,
      display: false
    },
    lib: {
      axios: axios
    },
    persistAttrs: [
      
    ]
  },
  components: { 
    //"chat-room": Chat
  },
  router: new VueRouter({
    routes: routes
  }),
  watch: {
    
  },
  mounted: async function () {
    await this.checkLogin()
    await this.testSession()
    
  },  // mounted: function () {
  methods: {
    testSession: async function () {
      let aURL = `${this.config.baseURL}/c`
      let bURL = `${this.config.baseURL}/b`
      
      let b1r = await window.axios.get(bURL)
      console.log(b1r.data)
      
      //await axios.get(`${this.config.baseURL}/c`, {
      await this.lib.axios.get(aURL)
      let r = await window.axios.get(bURL)
      console.log(r.data)
      
      setTimeout(async () => {
        let r2 = await window.axios.get(bURL)
        console.log(r2.data)
      }, 10000)
      
      
      return false
    },
    checkLogin: async function () {
      let result = await this.lib.axios.get(`${this.config.baseURL}/user.check-login`)
      //console.log(result.data)
      let path = this.$router.currentRoute.fullPath
      if (result.data === false) {
        if (path !== '/') {
          this.$router.replace('/')
        }
      }
      else {
        this.status.username = result.data
        if (path !== '/chat') {
          this.$router.replace('/chat')
        }
      }
    }
  } // methods: {
}

$(() => {
  new Vue(VueController)
})

window.VueController = VueController
