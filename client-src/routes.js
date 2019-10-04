const Foo = { template: '<div>foo AAA</div>' }
const Bar = { props:['status'],template: '<div>bar BBB {{ status.message }}</div>' }

//import Chat from './components/Chat/Chat.vue'

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

module.exports = routes