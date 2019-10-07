'use strict'

class OriginFilter {
  async handle (data, next) {
    let headers = data.request.headers()
    let origin = headers.origin
    if (typeof(origin) !== 'string' 
            && typeof(headers.referer) === 'string') {
      origin = headers.referer.split('/').slice(0,3).join('/')
    }
    data.origin = origin
    await next()
  }
}

module.exports = OriginFilter