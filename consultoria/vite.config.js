import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "VITE_");
export default defineConfig({
  // server: {
  //   port: 3003,
  //   proxy: {
  //     "/api": {
  //       target: env.VITE_BASE_API_URL,
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ""),
  //       secure: false,
  //       withCredentials: true,
  //     },
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      { find: "@hooks", replacement: resolve(__dirname, "./src/hooks") },
      {
        find: "@components",
        replacement: resolve(__dirname, "./src/components"),
      },
      { find: "@assets", replacement: resolve(__dirname, "./src/assets") },
      { find: "@helpers", replacement: resolve(__dirname, "./src/helpers") },
      { find: "@contexts", replacement: resolve(__dirname, "./src/contexts") },
      { find: "@pages", replacement: resolve(__dirname, "./src/pages") },
      { find: "@routes", replacement: resolve(__dirname, "./src/routes") },
    ],
  },
});
