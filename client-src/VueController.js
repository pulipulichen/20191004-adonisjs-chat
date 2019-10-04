import Vue from 'vue'
const config = require('./config.js')
require('./styles/global.less')
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
import i18n from './VueI18n'

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
