import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import nodePolyfills from "rollup-plugin-polyfill-node";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      react: "react",
      "react-dom": "react-dom",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },

  build: {
    rollupOptions: {
      plugins: [
        nodePolyfills({ include: ["crypto", "http"] }),
        inject({
          Buffer: ["buffer/", "Buffer"],
          process: "process/browser",
        }),
      ],
    },
  },
});
