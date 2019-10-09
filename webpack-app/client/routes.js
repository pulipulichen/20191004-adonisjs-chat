import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//console.log(__webpack_public_path__)

const Loading = () => import(/* webpackChunkName: "client-components/loading" */ './components/Loading/Loading.vue')
const Login = () => import(/* webpackChunkName: "client-components/login" */ './components/Login/Login.vue')
const Chat = () => import(/* webpackChunkName: "client-components/chat" */ './components/Chat/Chat.vue')

const routes = [
  { path: '/', component: Loading },
  { path: '/login', component: Login },
  { path: '/chat', component: Chat }
]

export default new VueRouter({
  routes: routes
})