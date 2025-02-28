import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routes';
import { OhVueIcon, addIcons } from 'oh-vue-icons';

createApp(App)
  .component('VIcon', OhVueIcon)
  .use(router)
  .mount('#app');

document.title = 'Elections Switcher';
