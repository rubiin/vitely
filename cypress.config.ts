import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/integration/**/*.spec.ts',
    chromeWebSecurity: false,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
