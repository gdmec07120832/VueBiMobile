import Axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/routes/index'
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
    const {data} = response
    if(data) {
      if(data.success) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        if(data.code === 401) {
          router.push('/login').then()
        }
        if(data.code === 403) {
          router.push('/404').then()
        }
        console.warn(`${response.config.url}出现错误`)
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
