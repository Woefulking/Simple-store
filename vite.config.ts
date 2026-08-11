import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: {
      App: path.resolve(__dirname, './src/App'),
      Entities: path.resolve(__dirname, './src/Entities'),
      Features: path.resolve(__dirname, './src/Features'),
      Pages: path.resolve(__dirname, './src/Pages'),
      Shared: path.resolve(__dirname, './src/Shared'),
      Widgets: path.resolve(__dirname, './src/Widgets'),
    },
  },
});
