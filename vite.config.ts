import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
