import './assets/style.css'

import { createApp } from 'vue'
import pinia from '@/stores'  
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(pinia)
app.use(router)

app.mount('#app')
