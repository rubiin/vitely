import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    // The app's vite config registers vite-plugin-pwa, which conflicts with
    // Storybook builds (it tries to precache storybook's own assets). Drop it.
    config.plugins = config.plugins.flat(Infinity).filter(plugin => {
      return !(plugin && String(plugin.name).startsWith('vite-plugin-pwa'));
    });
    return config;
  },
};

export default config;
