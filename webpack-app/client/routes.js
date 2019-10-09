import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Loading from './../components/Loading/Loading.vue'

let RouteHelper = {
  getRoutes: function () {
    let routes = [
      { path: '/', component: Loading },
      { path: '/login', component: () => import(/* webpackChunkName: "client-components/Login" */ './components/Login/Login.vue') },
      { path: '/chat', component: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue') }
    ]
    
    return new VueRouter({
      routes: routes
    })
  },
  appendTemplate: function (template, bindAttrs) {
    if (bindAttrs.indexOf('view') === -1) {
      bindAttrs.push('view')
    }
    
    let head = `<router-view  `
    let foot = `></router-view>`
    let bind = bindAttrs.map(attr => {
      return  `v-bind:${attr}="${attr}"`
    }).join(' ')
    
    let routerViewTemplate = head + bind + foot
    
    let templateHeader = template.slice(0, template.lastIndexOf('</'))
    let templateFooter = template.slice(template.lastIndexOf('</'))
    
    return templateHeader + routerViewTemplate + templateFooter
  },
}

export default RouteHelper