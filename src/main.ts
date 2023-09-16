import './assets/main.css'
import './assets/boxes.css'
import './assets/vars.css'

import { createApp, reactive } from 'vue'
import App from './App.vue'

// eslint-disable-next-line prefer-const
export let player = reactive({
  position: [0, 0]
})

createApp(App).mount('#app')
