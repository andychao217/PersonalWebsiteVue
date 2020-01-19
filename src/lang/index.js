import Vue from 'vue';
import VueI18n from 'vue-i18n';
 
Vue.use(VueI18n);
 
const DEFAULT_LANG = 'zh-CN';
 
const locales = {
    "zh-CN": require('./cn.js'),
    "en-US": require('./en.js'),
};
 
const i18n = new VueI18n({
    locale: DEFAULT_LANG,
    messages: locales,
});

export default i18n;