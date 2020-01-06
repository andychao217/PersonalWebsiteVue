import {
  baseURL
} from '@/config'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.timeout = 20000 // 超时默认值
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl
    }
    return config
  }
  interceptors(instance, url) {
    instance.interceptors.request.use(config => {
      if (!Object.keys(this.queue).length) {
        // Spin.show()
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      delete this.queue[url]
      const {
        data,
        status
      } = res
      return {
        data,
        status
      }
    }, error => {
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
