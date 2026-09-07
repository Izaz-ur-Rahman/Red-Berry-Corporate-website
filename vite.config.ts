import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: "0.0.0.0", // Bind to all IPv4 addresses
    port: 8080,
    strictPort: false,
  },
  preview: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
