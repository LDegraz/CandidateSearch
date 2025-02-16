import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000, // Use PORT from Render
    host: '0.0.0.0', // Ensure it binds to the right interface
  },
});
