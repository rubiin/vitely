import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import ViteFonts from 'vite-plugin-fonts';
import svgLoader from 'vite-svg-loader';
import ViteVisualizer from 'rollup-plugin-visualizer';
import strip from '@rollup/plugin-strip';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'dev';
  const isReport = mode === 'report';

  // loads environment variables from .env file and exposes them to process.env
  process.env = { ...process.env, ...loadEnv(mode, './env') };

  let optimizeDeps = {};
  if (isDev) {
    /**
     * DESC:
     * dependency pre-bundling
     */
    optimizeDeps = {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
        '@vue/shared',
        '@vue/runtime-core',
        '@vueuse/core',
        '@vueuse/head',
      ],
      exclude: ['vue-demi'],
    };
  }

  const plugins = [
    vue(),
    strip(),
    svgLoader(),
    Unocss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'pinia',
        'vee-validate',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
        '@vueuse/head',
      ],
    }),
    Components({
      extensions: ['vue'],
      directoryAsNamespace: true,
      globalNamespaces: ['global'],
      importPathTransform: path =>
        path.endsWith('.svg') ? `${path}?component` : undefined,
      include: [/\.vue$/, /\.md$/],
    }),

    ViteFonts({
      google: {
        families: ['Poppins', 'Montserrat'],
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [path.resolve(__dirname, './locales/**')],
    }),
    VitePWA({
      includeAssets: ['logotype.svg'],
      manifest: {
        name: 'Vitely',
        short_name: 'Vitely',
        description: 'A progressive web app boilerplate',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ];

  if (isReport) {
    plugins.push(
      /**
       * DESC:
       * visualize bundle
       */
      ViteVisualizer({
        filename: './dist/report.html',
        open: true,
        brotliSize: true,
      }),
    );
  }

  return {
    server: {
      port: +process.env.VITE_APP_PORT || 4000,
    },
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, './src'),
        '/@/stores': path.resolve(__dirname, './src/stores'),
      },
    },
    build: {
      minify: true,
      chunkSizeWarningLimit: 1024,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/')) {
              const modules = [
                'vue',
                'vee-validate',
                '@vueuse/core',
                'vue-i18n',
                'vue-router',
                'pinia',
              ];
              const chunk = modules.find(module =>
                id.includes(`/node_modules/${module}`),
              );
              return chunk ? `vendor-${chunk}` : 'vendor';
            }
          },
        },
      },
    },
    base: process.env.VITE_APP_BASE,
    plugins,
    optimizeDeps,
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },
  };
});
