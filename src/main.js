import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false

Vue.prototype.backendUrl = 'http://localhost:3000/frontend/';

new Vue({
  render: h => h(App),
}).$mount('#app')
