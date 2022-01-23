import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';
import { createI18n } from 'vue-i18n';

import './styles/base.css';
import { createPinia } from 'pinia';

import axios from './axios/axios';

// Router
import { Router } from '/@/router';

// i18n
import messages from '@intlify/vite-plugin-vue-i18n/messages';

import 'uno.css';

const app = createApp(App);

//
const i18n = createI18n({
  locale: 'en',
  messages,
});

app.config.globalProperties.$http = axios;

app.use(i18n);

app.use(createPinia());

app.use(Router);

app.mount('#app');
