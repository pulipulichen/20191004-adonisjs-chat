import Vue from 'vue'
Vue.config.devtools = false

const config = require('./config.js')
require('./styles/global.less')
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
import i18n from './VueI18n'

// --------------------
// Components

import Chat from './components/Chat/Chat.js'

// ----------------------

let $ = require('jquery')
$('body').append(`<div id="app">
  {{ status.message }}
</div>
`)

// -----------------------

let VueController = {
  el: '#app',
  i18n: i18n,
  data: {
    config: config,
    status: {
      message: 'Hello world.'
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
    chat: Chat
  },
  watch: {
    
  },
  mounted: function () {
    
  },  // mounted: function () {
  methods: {
    
  } // methods: {
}

new Vue(VueController)

window.VueController = VueController
