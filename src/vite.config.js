import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import React from 'react';

export default defineConfig({
  plugins: [react()],
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    },
    deps: {
      inline: [
        '@testing-library/user-event',
        '@testing-library/react'
      ]
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/src/test/**',
        '**/*.config.js'
      ]
    },
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },

  server: {
    port: 3000,
    mimeTypes: {
      'application/javascript': ['js', 'mjs', 'jsx'],
      'text/css': ['css']
    }
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  envPrefix: 'VITE_',
});