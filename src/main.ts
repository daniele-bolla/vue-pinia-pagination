import './index.css'
import VueLazyLoad from 'vue3-lazyload'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).use(VueLazyLoad, {
  loading: '/loading.gif'
})

app.mount('#app')
