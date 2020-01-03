import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './css/index.css'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
