import Loading from './../components/Loading/Loading.vue'
import Auth from './components/Auth/Auth.vue'

let components = {
  Loading: Loading,
  Auth: Auth,
  Login: () => import(/* webpackChunkName: "client-components/Login" */ './components/Login/Login.vue'),
  Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
}
export default components