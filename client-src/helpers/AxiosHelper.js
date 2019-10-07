import axios from 'axios'
axios.defaults.withCredentials = true
//axios.defaults.credentials = 'include'
//window.axios = axios

let AxiosHelper = {
  baseURL: '',
  setBaseURL: function (baseURL) {
    if (baseURL.endsWith('/') === true) {
      baseURL = baseURL.slice(0, -1)
    }
    this.baseURL = baseURL
    return this
  },
  getURL: function (path) {
    if (path.startsWith('/') === false) {
      path = '/' + path
    }
    return this.baseURL + path
  },
  get: async function (path, data) {
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    let result = axios.get(this.getURL(path), options)
    return result.data
  },
  getOther: async function (path, data) {
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    let result = axios.get(path, options)
    return result.data
  },
  post: async function (path, data) {
    let options = {}
    if (typeof(data) === 'object') {
      options = data
    }
    
    let result = axios.post(this.getURL(path), options)
    return result.data
  }
}

module.exports = AxiosHelper