import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routes';
import i18n from '@/i18n';
import { OhVueIcon } from 'oh-vue-icons';

createApp(App)
  .component('VIcon', OhVueIcon)
  .use(router)
  .use(i18n)
  .mount('#app');

document.title = 'Elections Switcher';
