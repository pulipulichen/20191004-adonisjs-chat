//const Foo = { template: '<div>foo AAA</div>' }
//const Bar = { props:['status'],template: '<div>bar BBB {{ status.message }}</div>' }

//const Loading = require('./components/Loading/Loading.vue').default
//const Login = require('./components/Login/Login.vue').default
//const Chat = require('./components/Chat/Chat.vue').default
import Loading from './components/Loading/Loading.vue'
import Login from './components/Login/Login.vue'
import Chat from './components/Chat/Chat.vue'

const routes = [
  { path: '/', component: Loading },
  { path: '/login', component: Login },
  { path: '/chat', component: Chat }
]

//module.exports = routes
export default routes