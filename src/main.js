import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import Vant from 'vant'

// 自动设置rem基准值
import 'amfe-flexible'

import 'vant/lib/index.css'
import './styles/index.css'
import '@/utils/dayjs'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
