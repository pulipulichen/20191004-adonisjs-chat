'use strict'

const Config = use('Config')
let directoryIndexMapping = Config.get('referer.directoryIndexMapping')

class RefererPathParser {
  async handle (data, next) {
    let headers = data.request.headers()
    let referer = headers.referer
    if (typeof(referer) !== 'string' 
            && typeof(headers.origin) === 'string') {
      referer = headers.origin
    }
    
    if (typeof(referer) !== 'string') {
      data.refererPath = '/'
      await next()
      return
    }
    
    let refererPath = '/' + referer.split('/').slice(3).join('/')
    
    for (let i = 0; i < directoryIndexMapping.length; i++) {
      let needle = directoryIndexMapping[i]
      if (refererPath.startsWith(needle) === true) {
        refererPath = '/' + refererPath.slice(needle.length)
        break
      }
    }
    
    data.refererPath = refererPath
    await next()
  }
}

module.exports = RefererPathParser