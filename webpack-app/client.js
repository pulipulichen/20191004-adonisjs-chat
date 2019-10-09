import Vue from 'vue'

// ----------------------------------
// plugins

import './plugins/plugins'
import './plugins/semantic-ui'
import i18n from './plugins/i18n'

// ----------------------------------
// Helpers
import AxiosHelper from './helpers/AxiosHelper'
import DayJSHelper from './helpers/DayJSHelper'
import StringHelper from './helpers/StringHelper'

// ----------------------

import $ from 'jquery'
import template from './client/client.tpl'
import config from './config.js'

// --------------------
// Components or routes

let bindAttrs = ['config', 'status', 'progress', 'lib']
//import RouteHelper from './client/routes'
import ComponentHelper from './client/components'

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
  //template: RouteHelper.appendTemplate(template, bindAttrs)
  //router: RouteHelper.getRoutes(),
  //components: {auth: Auth},
  
  template: ComponentHelper.appendTemplate(template, bindAttrs),
  components: ComponentHelper.getComponents(),
  
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
    view: 'Loading',
    persistAttrs: [
    ]
  },
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
      let view = 'Login'
      if (typeof(this.status.username) === 'string') {
        view = 'Chat'
      }
      //console.log(view)
      this.view = view
    },
    'config.locale': function () {
      this.lib.DayJSHelper.setLocale(this.config.locale)
    }
  },
  created: function () {
    /*
    if (this.$router.currentRoute.fullPath !== '/') {
      this.$router.replace('/')
    }
     */
    this.loadClientConfig()
  },
  mounted: function () {
  },
  methods: {
    loadClientConfig: function () {
      let config = window[this.config.clientConfigName]
      
      if (typeof(config) === 'object') {
        for (let key in config) {
          this.config[key] = config[key]
        }
      }
      
      //console.log(this.config)
    },
  }, // methods: {
  
  
  // --------------------------
  // Basic configuration
  el: '#app',
  i18n: i18n,
}

if (typeof(baseURL) === 'string') {
  $(() => {
    new Vue(VueController)
    
    $('body > #TestMessage').remove()
  })
}

window.VueController = VueController
