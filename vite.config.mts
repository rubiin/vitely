import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import Fonts from 'unplugin-fonts/vite';
import svgLoader from 'vite-svg-loader';
import strip from '@rollup/plugin-strip';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'dev';

  // loads environment variables from .env file and exposes them to process.env
  process.env = { ...process.env, ...loadEnv(mode, './env') };

  let optimizeDeps = {};
  if (isDev) {
    /**
     * DESC:
     * dependency pre-bundling
     */
    optimizeDeps = {
      include: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core'],
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
      ],
    }),
    Components({
      extensions: ['vue'],
      directoryAsNamespace: true,
      globalNamespaces: ['global'],
      importPathTransform: p =>
        p.endsWith('.svg') ? `${p}?component` : undefined,
      include: [/\.vue$/, /\.md$/],
    }),

    Fonts({
      google: {
        families: [
          {
            name: 'Fraunces',
            styles: 'ital,wght@0,300;0,400;0,500;0,600;1,400',
          },
          {
            name: 'Inter',
            styles: 'wght@300;400;500;600',
          },
          {
            name: 'JetBrains Mono',
            styles: 'wght@400;500',
          },
        ],
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
    }),

    // https://github.com/intlify/unplugin-vue-i18n
    VueI18n({
      include: [path.resolve(import.meta.dirname, './locales/**')],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'apple-touch-icon.png',
        'icons/*.svg',
      ],
      manifest: {
        name: 'Vitely',
        short_name: 'Vitely',
        description: 'A progressive web app boilerplate',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ];

  return {
    server: {
      port: process.env.VITE_APP_PORT ?? 4000,
    },
    resolve: {
      alias: {
        '/@': path.resolve(import.meta.dirname, './src'),
        '/@/stores': path.resolve(import.meta.dirname, './src/stores'),
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
      setupFiles: ['test/setup.ts'],
      server: {
        deps: {
          inline: ['@vue', '@vueuse', 'vue-demi'],
        },
      },
    },
  };
});
