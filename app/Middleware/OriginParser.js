'use strict'

const Config = use('Config')
let mapping = Config.get('origin.originMapping')

class OriginParser {
  async handle (data, next) {
    let headers = data.request.headers()
    let origin = headers.origin
    if (typeof(origin) !== 'string' 
            && typeof(headers.referer) === 'string') {
      origin = headers.referer.split('/').slice(0,3).join('/')
    }
    
    if (typeof(origin) !== 'string') {
      data.origin = '__direct'
      await next()
      return
    }
    
    // ---------------------
    // 先把127.0.0.1對應成localhost
    
    let parts = origin.split('/')
    let domain  = parts.slice(-1)[0]
    
    let host = domain
    let port = ''
    if (host.indexOf(':') > -1) {
      port = host.slice(host.indexOf(':'))
      if ((parts[0] === 'http' && port === ':80') 
              || (parts[0] === 'https' && port === ':443')) {
        port = ''
      }
      host = host.slice(0, host.indexOf(':'))
    }
    if (host === '127.0.0.1') {
      host = 'localhost'
      domain = host + port
      origin = parts.slice(0,-1).concat(domain).join('/')
    }
    
    //console.log(domain)
    
    // ------------------
    // 再從config做對應
    //console.log(mapping)
    
    if (typeof(mapping[domain]) === 'string') {
      origin = parts.slice(0,-1).concat(mapping[domain]).join('/')
    }
    
    data.origin = origin
    await next()
  }
}

module.exports = OriginParser