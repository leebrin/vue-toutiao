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

/**
 *  获取用户频道列表
 */
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels',
  })
}

/**
 *  获取所有用户频道列表
 */
export const getAllUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
  })
}

/**
 *  增加用户频道列表
 */
export const addUserChannel = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data,
  })
}

/**
 *  删除用户频道列表
 */
export const delUserChannel = (id) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`,
  })
}

/**
 *  获取文章列表
 */
export const getArticle = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params,
  })
}

/**
 *  获取文章详情
 */
export const getArticleDetail = (articleId) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`,
  })
}

/**
 *  关注用户
 */
export const addFollow = (userId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId,
    },
  })
}

/**
 *  取消关注用户
 */
export const cancelFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`,
  })
}

// 收藏文章
// Path： /app/v1_0/article/collections
// Method： POST
export const addCollect = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId,
    },
  })
}

// 取消收藏
// Path： /app/v1_0/article/collections/:target
// Method： DELETE
export const deleteCollect = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`,
  })
}

// 对文章点赞
// Path： /app/v1_0/article/likings
// Method： POST
export const userLike = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId,
    },
  })
}

// 取消点赞
// Path： /app/v1_0/article/likings/:target
// Method： DELETE
export const userCancelLike = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`,
  })
}

//获取用户个人资料
// Path： /app/v1_0/user/profile
// Method： GET
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile',
  })
}

// 修改用户数据
// Path： /app/v1_0/user/profile
// Method： PATCH
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data,
  })
}

// 编辑用户头像
// Path： /app/v1_0/user/photo
// Method： PATCH
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data,
  })
}
