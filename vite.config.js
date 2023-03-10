import { resolve } from 'path'
//vite.config.js
import {defineConfig} from "vite";
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'docs'),
        }
    },
    build: {
        chunkSizeWarningLimit:1500,
        rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }
});