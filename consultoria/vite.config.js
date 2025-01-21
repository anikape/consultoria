import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
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
