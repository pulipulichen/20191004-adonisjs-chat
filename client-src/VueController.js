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

// --------------------
import routes from './routes'

// --------------------
// Components

import Chat from './components/Chat/Chat.vue'

// ----------------------

let $ = require('jquery')
$('body').append(`<div id="app">
</div>
`)



// -----------------------

let VueController = {
  el: '#app',
  i18n: i18n,
  template: `
  <div>
    <router-link to="/">
      <button type="button" class="ui button">Go to Login</button>
    </router-link>
    <router-link to="/chat/p">
      <button type="button" class="ui button">Go to Chat</button>
    </router-link>

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
      username: ''
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
    routes
  }),
  watch: {
    
  },
  mounted: function () {
    
  },  // mounted: function () {
  methods: {
    
  } // methods: {
}

$(() => {
  new Vue(VueController)
})

window.VueController = VueController