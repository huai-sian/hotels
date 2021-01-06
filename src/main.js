import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VCharts from 'v-charts';
import jquery from 'jquery';
import 'bootstrap';
import App from './App.vue';
import router from './router';
import store from './store';
import currency from './filter/currency';

Vue.use(VCharts);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currency);
window.$ = jquery;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
