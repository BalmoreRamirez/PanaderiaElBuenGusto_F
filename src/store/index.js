import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";
import decode from 'jwt-decode'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: '',
        usuarioDB: ''
    },
    mutations: {
        obtenerUsuario(state, payload) {
            state.token = payload;
            if (payload === '') {
                state.usuarioDB = ''
            } else {
                state.usuarioDB = decode(payload);
                router.push({name: 'inventario'})
            }
        }
    },
    actions: {
        guardarUsuario({commit}, payload) {
            localStorage.setItem('token', payload);
            commit('obtenerUsuario', payload)
        },
        cerrarSesion({commit}) {
            commit('obtenerUsuario', '');
            localStorage.removeItem('token');
            router.push({name: 'login'});
        }
    },
    getters: {
        estaActivo: state => !!state.token
    },
    modules: {}
})
