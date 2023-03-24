import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Immerse/',
    build: {
        target: "esnext"
    },
    plugins: [
        copy({
            targets: [
                { src: 'public/music/**/*', dest: 'dist/music' }
            ]
        })
    ]
})