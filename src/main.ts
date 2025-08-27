// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import createPersistedState  from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
pinia.use(createPersistedState)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
