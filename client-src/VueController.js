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

// ----------------------------------

import axios from 'axios'
axios.defaults.withCredentials = true
//axios.defaults.credentials = 'include'
//window.axios = axios

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//import 'dayjs/locale/zh-tw' // load on demand
dayjs.extend(relativeTime)
let dayjsLocale = config.locale.toLowerCase()

require(`dayjs/locale/zh-tw`).default
try {
  //require(`dayjs/locale/${dayjsLocale}`).default // load on demand
  dayjs.locale(dayjsLocale)
}
catch (e) {
  console.error(`dayjs locale is error: ${dayjsLocale}`)
}

// --------------------
import routes from './routes'

// --------------------
// Components

import Auth from './components/Auth/Auth.vue'

// ----------------------

let $ = require('jquery')

// -----------------------
// 確認 baseURL

let baseURL
let baseScript = $(`script#${config.appName}:first`)
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
  
    <auth v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        ref="auth"></auth>
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
      axios: axios,
      dayjs: dayjs
    },
    persistAttrs: [
      
    ]
  },
  components: { 
    //"chat-room": Chat
    auth: Auth
  },
  router: new VueRouter({
    routes: routes
  }),
  watch: {
    'status.username': function () {
      //console.log(this.status.username)
      let path = '/login'
      if (typeof(this.status.username) === 'string') {
        path = '/chat'
      }
      
      if (this.$router.currentRoute.fullPath !== path) {
        this.$router.replace(path)
      }
    }
  },
  created: function () {
    if (this.$router.currentRoute.fullPath !== '/') {
      this.$router.replace('/')
    }
  },
  mounted: async function () {
    this.loadLocalConfig()
    /*
    if (typeof(this.config.username) !== 'string' 
            && typeof(this.config.usernameQueryURL) === 'string') {
      this.config.username = await loginComponent.methods.loadUsernameFromURL()
    }
    if (typeof(this.config.username) === 'string') {
      await loginComponent.methods.attemptLoginViaUsername(this.config.username)
    }
    */
    //await this.checkLogin()
    
    //await this.testSession()
    //await this.test20191006SubSession()
  },  // mounted: function () {
  methods: {
    loadLocalConfig: function () {
      let localConfig = window[`${this.config.appName}_CONFIG`]
      
      if (typeof(localConfig) === 'object') {
        for (let key in localConfig) {
          this.config[key] = localConfig
        }
      }
    },
    test20191006SubSession: async function () {
      let urlList = [
        //`${this.config.baseURL}/sub1/a`,
        //`${this.config.baseURL}/sub1/b`,
        //`${this.config.baseURL}/sub2/b`,
        `${this.config.baseURL}/sub2/b`,
        `${this.config.baseURL}/sub1/b`,
        `${this.config.baseURL}/sub2/c`,
        `${this.config.baseURL}/sub1/a`,
        `${this.config.baseURL}/sub1/b`,
        `${this.config.baseURL}/sub2/b`,
      ]
      let _this = this
      /*
      urlList.map(async function(url) {
        let r
        r = await _this.lib.axios.get(url)
        console.log(url, r.data)
      })
      */
      for (let i = 0; i < urlList.length; i++) {
        let url = urlList[i]
        let r
        r = await _this.lib.axios.get(url)
        console.log(url, r.data)
      }
    },
    testSession: async function () {
      let aURL = `${this.config.baseURL}/c.c`
      let bURL = `${this.config.baseURL}/b.b`
      let dURL = `${this.config.baseURL}/d.d`
      
      let r
      //r = await this.lib.axios.get(bURL)
      //console.log('應該要沒有資料', r.data)
      
      //await axios.get(`${this.config.baseURL}/c`, {
      await this.lib.axios.get(aURL)
      r = await this.lib.axios.get(bURL)
      console.log('應該要有資料', r.data)
      
      let _this = this
      //setTimeout(async function () {
        await _this.lib.axios.get(dURL)
        r = await _this.lib.axios.get(bURL)
        console.log('應該要沒有資料', r.data)
      //}, 3000)
        
      
      /*
      setTimeout(async () => {
        let r2 = await window.axios.get(bURL)
        console.log(r2.data)
      }, 1000)
      */
      
      return false
    },
  } // methods: {
}

$(() => {
  new Vue(VueController)
})

window.VueController = VueController
