// vite.config.js
import { resolve } from "node:path";
import { defineConfig } from "file:///home/edcabralc/playground/consultoria_front/consultoria/node_modules/vite/dist/node/index.js";
import react from "file:///home/edcabralc/playground/consultoria_front/consultoria/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/home/edcabralc/playground/consultoria_front/consultoria";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__vite_injected_original_dirname, "./src") },
      { find: "@hooks", replacement: resolve(__vite_injected_original_dirname, "./src/hooks") },
      {
        find: "@components",
        replacement: resolve(__vite_injected_original_dirname, "./src/components")
      },
      { find: "@assets", replacement: resolve(__vite_injected_original_dirname, "./src/assets") },
      { find: "@helpers", replacement: resolve(__vite_injected_original_dirname, "./src/helpers") },
      { find: "@contexts", replacement: resolve(__vite_injected_original_dirname, "./src/contexts") },
      { find: "@pages", replacement: resolve(__vite_injected_original_dirname, "./src/pages") },
      { find: "@routes", replacement: resolve(__vite_injected_original_dirname, "./src/routes") }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9lZGNhYnJhbGMvcGxheWdyb3VuZC9jb25zdWx0b3JpYV9mcm9udC9jb25zdWx0b3JpYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZWRjYWJyYWxjL3BsYXlncm91bmQvY29uc3VsdG9yaWFfZnJvbnQvY29uc3VsdG9yaWEvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZWRjYWJyYWxjL3BsYXlncm91bmQvY29uc3VsdG9yaWFfZnJvbnQvY29uc3VsdG9yaWEvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7IGZpbmQ6IFwiQFwiLCByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIikgfSxcclxuICAgICAgeyBmaW5kOiBcIkBob29rc1wiLCByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvaG9va3NcIikgfSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6IFwiQGNvbXBvbmVudHNcIixcclxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29tcG9uZW50c1wiKSxcclxuICAgICAgfSxcclxuICAgICAgeyBmaW5kOiBcIkBhc3NldHNcIiwgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2Fzc2V0c1wiKSB9LFxyXG4gICAgICB7IGZpbmQ6IFwiQGhlbHBlcnNcIiwgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2hlbHBlcnNcIikgfSxcclxuICAgICAgeyBmaW5kOiBcIkBjb250ZXh0c1wiLCByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29udGV4dHNcIikgfSxcclxuICAgICAgeyBmaW5kOiBcIkBwYWdlc1wiLCByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcGFnZXNcIikgfSxcclxuICAgICAgeyBmaW5kOiBcIkByb3V0ZXNcIiwgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3JvdXRlc1wiKSB9LFxyXG4gICAgXSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixTQUFTLGVBQWU7QUFDbFgsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBRmxCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sS0FBSyxhQUFhLFFBQVEsa0NBQVcsT0FBTyxFQUFFO0FBQUEsTUFDdEQsRUFBRSxNQUFNLFVBQVUsYUFBYSxRQUFRLGtDQUFXLGFBQWEsRUFBRTtBQUFBLE1BQ2pFO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLEVBQUUsTUFBTSxXQUFXLGFBQWEsUUFBUSxrQ0FBVyxjQUFjLEVBQUU7QUFBQSxNQUNuRSxFQUFFLE1BQU0sWUFBWSxhQUFhLFFBQVEsa0NBQVcsZUFBZSxFQUFFO0FBQUEsTUFDckUsRUFBRSxNQUFNLGFBQWEsYUFBYSxRQUFRLGtDQUFXLGdCQUFnQixFQUFFO0FBQUEsTUFDdkUsRUFBRSxNQUFNLFVBQVUsYUFBYSxRQUFRLGtDQUFXLGFBQWEsRUFBRTtBQUFBLE1BQ2pFLEVBQUUsTUFBTSxXQUFXLGFBQWEsUUFBUSxrQ0FBVyxjQUFjLEVBQUU7QUFBQSxJQUNyRTtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
