import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: './',
    plugins: [react()]
});
