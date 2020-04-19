import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
const axios = require('axios');
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')