import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Loading from './client/components/Loading/Loading.vue'
import Login from './client/components/Login/Login.vue'
import Chat from './client/components/Chat/Chat.vue'

const routes = [
  { path: '/', component: Loading },
  { path: '/login', component: Login },
  { path: '/chat', component: Chat }
]

export default new VueRouter({
    routes: routes
})