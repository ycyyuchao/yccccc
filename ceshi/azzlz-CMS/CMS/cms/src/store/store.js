import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie';
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(Vuex);



export const store = new Vuex.Store({
    state: {
        login: false
    },
    getters: {
        login: state => {
            return state.login;
        }
    },
    mutations: {
        checklogin: (state, payload) => {
            state.login = payload;
        },
        logins: (state, payload) => {
            console.log(payload)

        }
    },
    actions: {
        checklogin: ({ commit }, payload) => {
            commit('checklogin', payload)
        },
        logins: ({ commit }, payload) => {
            commit('logins', payload)
            axios({
                url: `${cmsurl}/user/list`,
                data: {
                    name: payload
                },
                method: 'post'
            }).then(res => {
                if (res.data.total > 0) {
                    this.a.state.login = true;
                    Vue.cookie.set('User', payload, { expires: 7 });
                }
            })
        }
    }
})