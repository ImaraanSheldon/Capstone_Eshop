import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { VueCookies } from 'vue3-cookies'

// App.use(VueCookies, { 
//     expires: '1d' // Set default expiration for cookies
//   })

createApp(App).use(store).use(router).mount('#app')
