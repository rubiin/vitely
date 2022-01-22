import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import PurgeIcons from 'vite-plugin-purge-icons';
import compress from 'vite-plugin-compress';
import clearConsole from 'vite-plugin-remove-console';
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetUno(),
        clearConsole(),
        compress({
          brotli: true,
          verbose: true,
        }),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', '@vueuse/core', 'pinia', 'vee-validate', 'vue-i18n'],
    }),
    Components({
      extensions: ['vue'],
      directoryAsNamespace: true,
      globalNamespaces: ['global'],
      importPathTransform: path =>
        path.endsWith('.svg') ? `${path}?component` : undefined,
      include: [/\.vue$/, /\.md$/],
    }),
    ViteWebfontDownload([
      'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
      'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
    ]),
    // https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
    PurgeIcons({
      /* PurgeIcons Options */
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [path.resolve(__dirname, './locales/**')],
    }),
  ],
});
