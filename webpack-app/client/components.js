import Loading from './../components/Loading/Loading.vue'
import Auth from './components/Auth/Auth.vue'

let ComponentHelper = {
  getComponents: function () {
    let components = {
      Auth: Auth,
      Loading: Loading,
      "Login": () => import(/* webpackChunkName: "client-components/Login" */ './components/Login/Login.vue'),
      Chat: () => import(/* webpackChunkName: "client-components/Chat" */ './components/Chat/Chat.vue'),
    }
    return components
  },
  appendTemplate: function (template, bindAttrs) {
    if (bindAttrs.indexOf('view') === -1) {
      bindAttrs.push('view')
    }
    
    let head = `<keep-alive>
    <component v-bind:is="view" `
    let foot = `></component>
  </keep-alive>`
    let bind = bindAttrs.map(attr => {
      return  `v-bind:${attr}="${attr}"`
    }).join(' ')
    
    let componentTemplate = head + bind + foot
    
    let templateHeader = template.slice(0, template.lastIndexOf('</'))
    let templateFooter = template.slice(template.lastIndexOf('</'))
    
    return templateHeader + componentTemplate + templateFooter
  }
}

export default ComponentHelper