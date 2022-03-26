import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

//定义一个常量，防止getItem和setItem设置的'user'不一样，保持一致性
const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), //当前登录用户的登录状态（token等数据）
  },
  mutations: {
    setUser(state, data) {
      state.user = data

      //为了防止页面刷新数据丢失，将数据放至本地存储,数据持久化
      setItem(USER_KEY, state.user)
    },
  },
  actions: {},
  modules: {},
})
