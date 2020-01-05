import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueI18n from "vue-i18n";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./css/index.css";

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Antd);

//定义标识符
const i18n = new VueI18n({
  locale: "zh-CN", // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    "zh-CN": require("./lang/cn"), // 中文语言包
    "en-US": require("./lang/en") // 英文语言包
  }
});

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
