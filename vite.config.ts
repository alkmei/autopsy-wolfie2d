import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, "benchmark2/assets"),
          dest: "./benchmark2/assets",
        },
        {
          src: resolve(__dirname, "benchmark3/assets"),
          dest: "./benchmark3/assets",
        },
      ],
    }),
  ],
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
        benchmark3: resolve(__dirname, "benchmark3/index.html"),
      },
    },
  },
});
