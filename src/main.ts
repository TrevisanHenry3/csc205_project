import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import Oruga from "@oruga-ui/oruga-next"
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import '@oruga-ui/theme-bulma/style.css'

/* add fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

/* import PrimeVue for tables */
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'; // Or 'Lara'



library.add(fas)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});
app.use(Oruga, bulmaConfig)
app.use(createPinia())
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')


