import '../node_modules/swiper/dist/css/swiper.css'
import './assets/css/reset.css'
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swiper from 'swiper';
import VueI18n from 'vue-i18n';
import LangStorage from './assets/js/lang'
import './global';
import VueRouter from 'vue-router';
import {routes} from './routes.js';

Vue.config.productionTip = false;//去掉vue警告

Vue.use(VueRouter);
Vue.use(VueAxios,axios);
Vue.use(VueI18n);
const router = new VueRouter({
  routes:routes, 
	mode:'hash' 
});

router.beforeEach((to, from, next) => {    
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})

const i18n = new VueI18n({
  locale: LangStorage.getLang('zh'),  // 语言标识
  messages: {
      'zh': require('./lang/zh.js'),
      'en': require('./lang/en.js')
  }
})

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})