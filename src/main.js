import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routes';
import i18n from '@/i18n';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdLanguage, BiGithub, BiHeartFill } from 'oh-vue-icons/icons';

addIcons(MdLanguage, BiGithub, BiHeartFill);

createApp(App)
  .component('v-icon', OhVueIcon)
  .use(router)
  .use(i18n)
  .mount('#app');

document.title = 'Elections Simulator';
