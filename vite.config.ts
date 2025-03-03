import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.md'],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  optimizeDeps: {
    include: ['gray-matter', 'marked']
  },
  define: {
    'process.env': {},
    'Buffer': ['buffer', 'Buffer'],
  }
}));
