import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '127.0.0.1', // ✅ fuerza IPv4 y evita el [::1]
        port: 5174,         // podés cambiarlo si ya está en uso
    },
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true, // ✅ habilita React Refresh
        }),
        react(), // ✅ necesario para @react-refresh
    ],
});
