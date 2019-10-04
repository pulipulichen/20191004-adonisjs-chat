//const Foo = { template: '<div>foo AAA</div>' }
//const Bar = { props:['status'],template: '<div>bar BBB {{ status.message }}</div>' }

const Login = require('./components/Login/Login.vue').default
const Chat = require('./components/Chat/Chat.vue').default

const routes = [
  { path: '/', component: Login },
  { path: '/chat/:name', component: Chat }
]

module.exports = routes