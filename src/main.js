import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import './assets/CSS/style.css'

createApp(App)
.use(router)
.mount('#app')