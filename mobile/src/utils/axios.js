import Axios from 'axios'
import {Notify} from "vant";

const instance = Axios.create({
  timeout: 60 * 1000,
  baseURL: '/bi',
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const {data, config: {failedTip}} = response
    if(data) {
      if(data.success) {
        return Promise.resolve(data)
      } else {
        if(failedTip !== false) {
          Notify({
            type: 'danger',
            message: data?.msg || '接口错误'
          })
        }
        return Promise.reject(data)
      }
    }
    console.warn(`${response.config.url}出现错误`)
    return Promise.reject('接口错误')
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
