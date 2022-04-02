import request from '@/utils/request.js'

/**
 *  获取搜索联想建议
 */
export const getSearchSuggessions = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q,
    },
  })
}

/**
 *  获取搜索结果
 */
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params,
  })
}

/**
 *  获取搜索结果历史记录
 */
export const getSearchHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories',
  })
}
