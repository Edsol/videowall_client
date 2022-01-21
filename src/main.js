import { createApp } from 'vue'
import mitt from 'mitt'
import axios from 'axios'
import App from './App.vue'

import VueToast from 'vue-toast-notification';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPhone, faTrashAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faPhone, faTrashAlt, faTimesCircle);

const emitter = mitt();
const app = createApp(App)

app.config.globalProperties.backendUrl = 'http://localhost:3000/frontend/';
app.config.globalProperties.apiUrl = 'http://localhost:3000/api/';
app.config.globalProperties.emitter = emitter
app.config.globalProperties.axios = axios

app.use(VueToast);
app.component("font-awesome-icon", FontAwesomeIcon)


app.mount('#app')