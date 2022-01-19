import { createApp } from 'vue'
import App from './App.vue'

import VueToast from 'vue-toast-notification';

import 'bootstrap/dist/css/bootstrap.css';
import 'vue-toast-notification/dist/theme-sugar.css';


const app = createApp(App)

app.config.globalProperties.backendUrl = 'http://localhost:3000/frontend/';

app.use(VueToast);
app.mount('#app')