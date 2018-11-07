// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//图片预加载
import VueLazyLoad from 'vue-lazyload'
import lazyload from './assets/icon/lazyload.png'
Vue.use(VueLazyLoad,{
	loading:lazyload
})

//清除移动端事件延时300毫秒
import FastClick from 'fastclick'
FastClick.attach(document.body);

Vue.config.productionTip = false

 //eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
