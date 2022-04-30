import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  transformResponse: [
    function (data) {
      try {
        return JSONbig.parse(data)
      } catch (error) {
        console.log('转换失败', error)
        return data
      }
    },
  ],
  timeout: 5000,
})

//请求拦截器
request.interceptors.request.use(
  (config) => {
    //config 配置对象
    const { user } = store.state

    //如果用户已登录，统一给接口设置token信息
    if (user) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)
//响应拦截器
request.interceptors.response.use((config) => {
  //config 配置对象
  return config
})
export default request
