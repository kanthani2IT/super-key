import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  base: "/",
  define: {
    global: "window",
  },
  resolve: {
   alias: {
  "~": path.resolve(__dirname, "node_modules"),
  src: path.resolve(__dirname, "src"),
},
  },
  server: {
    host: "0.0.0.0", 
    open: false,
    port: 3000,
  },
  preview: {
    host: "0.0.0.0", 
    open: true,
    port: 3000,
  },
});
