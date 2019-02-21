import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router';
import { routes } from './routes';
import global_ from './components/Global' //引用文件
import moment from "../moment";
import { store } from './store/store';
import VueCookie from 'vue-cookie';
import './global';

Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面

Vue.prototype.moment = moment;


Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD ';
    return moment(value).format(formatString)
})

if (!String.prototype.moment) {
    String.prototype.moment = function(formatString) {
        formatString = formatString || 'YYYY-MM-DD ';
        return moment(this).format(formatString)
    };
}

Vue.use(VueAxios, axios);
Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VueCookie);

const router = new VueRouter({
    routes: routes, // 可以直接写成routes
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})