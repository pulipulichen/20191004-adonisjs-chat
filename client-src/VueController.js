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
    lib: {},
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
  mounted: function () {
    this.checkLogin()
  },  // mounted: function () {
  methods: {
    checkLogin: async function () {
      let result = await axios.get(`${this.config.baseURL}/check-login`)
      console.log(result.data)
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
