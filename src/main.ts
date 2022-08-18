 import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from "bootstrap-vue"

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
