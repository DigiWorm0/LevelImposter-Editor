import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import eslint from "@nabla/vite-plugin-eslint";
import {nodePolyfills} from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    "jotai/babel/plugin-debug-label"
                ]
            }
        }),
        nodePolyfills({
            globals: {
                Buffer: true
            }
        }),
        viteTsconfigPaths(),
        eslint()
    ],
});