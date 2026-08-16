import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import np from '../locales/np.json';

import '../src/assets/styles/base.scss';
import 'uno.css';

// Landing page components use the app's i18n (t()), theme CSS variables and
// UnoCSS utilities, so install the same plugin and global styles Storybook
// renders into.
setup(app => {
  app.use(
    createI18n({
      locale: 'en',
      messages: { en, np },
    }),
  );
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
