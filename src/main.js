import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)
axios.defaults.baseURL='https://panaderiabg.ga';
Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
