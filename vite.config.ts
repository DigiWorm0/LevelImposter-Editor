import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import eslint from "@nabla/vite-plugin-eslint";

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
        viteTsconfigPaths(),
        eslint()
    ],
});