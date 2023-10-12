import { resolve } from 'path'
import { defineConfig } from "vite";
export default  defineConfig({
    resolve: {
        alias: {
            'utils': resolve(__dirname + '/utils'),
        }
    },
    server: {
        host: '0.0.0.0'
        // open: true
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