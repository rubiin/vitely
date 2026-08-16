import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

// Router
import { Router } from '/@/router';

import App from './App.vue';

// i18n
import messages from '@intlify/unplugin-vue-i18n/messages';

// store
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// styles

import './assets/styles/base.scss';
import 'uno.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

//
const i18n = createI18n({
  locale: 'en',
  messages,
});

app.use(i18n);

app.use(pinia);

app.use(Router);

app.mount('#app');
