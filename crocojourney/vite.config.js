import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: 'CrocoJourney',
                short_name: 'CrocoJourney',
                description: 'Application de covoiturage',
                theme_color: '#97B05F',
            },
        }),
    ],
});
