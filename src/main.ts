import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Oruga from "@oruga-ui/oruga-next"
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import '@oruga-ui/theme-bulma/style.css'

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)

const app = createApp(App)

app.use(Oruga, bulmaConfig)


app.use(createPinia())
app.use(router)

app.mount('#app')


