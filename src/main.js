import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { VueCookies } from 'vue3-cookies'

// App.use(VueCookies, { expires: '7d' }) // Set cookie expiration

createApp(App).use(store).use(router).use(VueCookies, { expires: '30mins' }).mount('#app')
