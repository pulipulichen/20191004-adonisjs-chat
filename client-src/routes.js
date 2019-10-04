const Foo = { template: '<div>foo AAA</div>' }
const Bar = { template: '<div>bar BBB</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

module.exports = routes