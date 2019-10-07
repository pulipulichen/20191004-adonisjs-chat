import Vue from 'vue'
Vue.config.devtools = false

const config = require('./config.js')
require('./styles/global.less')

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import i18n from './VueI18n'

// -------------------------

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'

// ----------------------------------
import AxiosHelper from './helpers/AxiosHelper'
import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'

//const AxiosHelper = require('./helpers/AxiosHelper').default
//const DayJSHelper = require('./helpers/DayJSHelper').default
//const StringHelper = require('./helpers/StringHelper').default

// --------------------


// --------------------
// Components

import Auth from './components/Auth/Auth.vue'

// ----------------------

let $ = require('jquery')

// -----------------------
// 確認 baseURL

let baseURL
let baseScript = $(document.currentScript)
if (baseScript.length === 1) {
  baseURL = baseScript.attr('src').split('/').slice(0, 3).join('/')
  //console.log(baseURL)
  config.baseURL = baseURL
  baseScript.before(`<div id="app"></div>`)
}

// -----------------------

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
      AxiosHelper: AxiosHelper.setBaseURL(baseURL),
      DayJSHelper: DayJSHelper,
      StringHelper: StringHelper
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
    },
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    }
  },
  created: function () {
    if (this.$router.currentRoute.fullPath !== '/') {
      this.$router.replace('/')
    }
    this.loadLocalConfig()
  },
  mounted: function () {
  },
  methods: {
    loadLocalConfig: function () {
      let localConfig = window[this.config.localConfigName]
      
      if (typeof(localConfig) === 'object') {
        for (let key in localConfig) {
          this.config[key] = localConfig[key]
        }
      }
      
      //console.log(this.config)
    },
    test20191006SubSession: async function () {
      let urlList = [
        //`${this.config.baseURL}/sub1/a`,
        //`${this.config.baseURL}/sub1/b`,
        //`${this.config.baseURL}/sub2/b`,
        `/sub2/b`,
        `/sub1/b`,
        `/sub2/c`,
        `/sub1/a`,
        `/sub1/b`,
        `/sub2/b`,
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
        r = await _this.lib.AxiosHelper.get(url)
        console.log(url, r)
      }
    },
    testSession: async function () {
      let aURL = `/c.c`
      let bURL = `/b.b`
      let dURL = `/d.d`
      
      let r
      //r = await this.lib.axios.get(bURL)
      //console.log('應該要沒有資料', r.data)
      
      //await axios.get(`${this.config.baseURL}/c`, {
      await this.lib.AxiosHelper.get(aURL)
      r = await this.lib.AxiosHelper.get(bURL)
      console.log('應該要有資料', r)
      
      let _this = this
      //setTimeout(async function () {
        await _this.lib.AxiosHelper.get(dURL)
        r = await _this.lib.AxiosHelper.get(bURL)
        console.log('應該要沒有資料', r)
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

if (baseURL !== undefined) {
  $(() => {
    new Vue(VueController)
  })
}

window.VueController = VueController
