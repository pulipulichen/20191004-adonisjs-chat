import Vue from 'vue'

// ----------------------------------
// plugins

import './plugins/plugins'
import './plugins/semantic-ui'
import i18n from './plugins/i18n'
import router from './admin/routes'

// ----------------------------------
// Helpers
import AxiosHelper from './helpers/AxiosHelper'
import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'

// --------------------
// Components

import Auth from './admin/components/Auth/Auth.vue'

// ----------------------

import $ from 'jquery'
import template from './admin/admin.tpl'
import config from './config.js'

// -----------------------
// 確認 baseURL

let baseURL = '/'
let baseScript = $(document.currentScript)
config.baseURL = baseURL
baseScript.before(`<div id="app"></div>`)

// -----------------------

let VueController = {
  el: '#app',
  i18n: i18n,
  template: template,
  data: {
    message: 'Hello, world.', // for test
    users: [],
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
      /*
      let path = '/login'
      if (typeof(this.status.username) === 'string') {
        path = '/chat'
      }
      
      if (this.$router.currentRoute.fullPath !== path) {
        this.$router.replace(path)
      }
       */
    },
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    },
    '$route.query.origin': function () {
      console.log(this.$route.query.origin)
      if (typeof(this.$route.query.origin) === 'string' 
              && this.$route.query.origin !== '') {
        this.loadUsers(this.$route.query.origin)
      }
    }
  },
  created: function () {
    
  },
  mounted: function () {
    if (typeof(this.$route.query.origin) === 'string' 
            && this.$route.query.origin !== '') {
      this.loadUsers(this.$route.query.origin)
    }
  },
  methods: {
    loadUsers: async function (origin) {
      let users = await this.lib.AxiosHelper.get('/admin/user/list', {
        origin: origin
      })
      
      if (Array.isArray(users)) {
        this.users = users
      }
    }
  } // methods: {
}

if (typeof(baseURL) === 'string') {
  $(() => {
    new Vue(VueController)
  })
}

window.VueController = VueController