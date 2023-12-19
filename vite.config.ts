import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      '@/templates': path.resolve(__dirname, './src/templates'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/scripts': path.resolve(__dirname, './src/scripts'),
      '@/glsl': path.resolve(__dirname, './src/glsl'),
      '@/public': path.resolve(__dirname, './'),
    },
  },
  plugins: [glsl()],
});
