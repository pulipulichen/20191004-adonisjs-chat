import Vue from 'vue'
Vue.config.devtools = false

const config = require('./config.js')
require('./styles/global.less')

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

import i18n from './i18n'
import router from './routes'

// ----------------------------------
// Helpers
import AxiosHelper from './helpers/AxiosHelper'
import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'

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
    status: {
      username: '',
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
    auth: Auth
  },
  router: router,
  watch: {
    'status.username': function () {
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
  } // methods: {
}

if (typeof(baseURL) === 'string') {
  $(() => {
    new Vue(VueController)
  })
}

window.VueController = VueController
