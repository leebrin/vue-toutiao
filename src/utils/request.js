import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '../router'

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

const refreshTokenReq = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
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
request.interceptors.response.use(
  (config) => {
    //config 配置对象
    return config
  },
  async (err) => {
    const status = err.response.status
    if (status === 400) {
      Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
      //token无效
      //如果没有user或user.token，直接登录
      const { user } = store.state
      if (!user || !user.token) {
        return redirectLogin()
      }

      //使用refresh_token请求获取新的token
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: { Authorization: `Bearer ${user.rerfesh_token}` },
        })

        //拿到新的token之后更新到容器中
        //console.log(data)
        user.token = data.data.token
        store.commit('setUser', user)

        //把失败请求重新发出去
        //err.config 是本次请求的相关配置信息对象
        return request(err.config)
      } catch (err) {
        redirectLogin()
      }
    } else if (status === 403) {
      Toast.fail('无权限操作')
    } else if (status >= 500) {
      Toast.fail('服务端异常，请稍后重试')
    }
    //console.dir(err)
    //抛出异常
    return Promise.reject(err)
  },
)
function redirectLogin() {
  router.replace({
    name: 'login',
    //传递查询参数
    query: {
      //router.currentRoute 和在组件中获取的this.$route 是一个东西
      redirect: router.currentRoute.fullPath,
    },
  })
}
export default request
