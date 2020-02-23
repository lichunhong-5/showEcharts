import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $http from './scripts/https'
import $echarts from 'echarts'


Vue.config.productionTip = false

Vue.prototype.$http = $http
Vue.prototype.$echarts = $echarts


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
