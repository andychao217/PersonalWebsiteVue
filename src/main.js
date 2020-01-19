import Vue from "vue";
import i18n from "./lang/index.js"
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Bus from './lib/bus';
import util from './lib/util';
import Antd from "ant-design-vue";
import Vant from 'vant';
import VCharts from 'v-charts';
import "ant-design-vue/dist/antd.css";
import 'vant/lib/index.css';
import "./css/index.css";
// import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.prototype.$bus = Bus;
Vue.prototype.$util = util;
Vue.use(Antd);
Vue.use(Vant);
Vue.use(VCharts);
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
