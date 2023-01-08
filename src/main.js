import { createApp } from 'vue'
import './style.css'
import DB from '@/database/index'
import App from './App.vue'


DB.open().then(() => {
  createApp(App).mount('#app')
  DB.table('notes').add({ id: 1, note: 'selam' })
}).catch(e => {
  console.log(e)
})
