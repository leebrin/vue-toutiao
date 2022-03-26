import request from '@/utils/request.js'

//在非组件模块中获取store必须通过这种方式，此处单独加载store和在组件中this.$store一个意思
// import store from '@/store/'

/**
 *  登录/注册
 */
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data,
  })
}

/**
 *  发送短信验证码
 */
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}

/**
 *  获取登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
