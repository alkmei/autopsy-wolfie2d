import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        benchmark1: resolve(__dirname, "benchmark1/index.html"),
        benchmark2: resolve(__dirname, "benchmark2/index.html"),
      },
    },
  },
});
