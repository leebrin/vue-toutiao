import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import Vant from 'vant'

import './styles/index.css'
import 'vant/lib/index.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
