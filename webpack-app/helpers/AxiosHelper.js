import axios from 'axios'
axios.defaults.withCredentials = true

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
    path = this.getURL(path)
    let result = await this.getOther(path, data)
    return result
  },
  getOther: async function (path, data) {
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    try {
      let result = await axios.get(path, options)
      return result.data
    }
    catch (error) {
      console.error(error)
      return
    }
  },
  post: async function (path, data) {
    let options = {}
    if (typeof(data) === 'object') {
      options = data
    }
    
    try {
      let result = await axios.post(this.getURL(path), options)
      return result.data
    }
    catch (error) {
      console.error(error)
      return
    }
  }
}

export default AxiosHelper