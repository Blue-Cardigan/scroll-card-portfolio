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
      buffer: 'buffer/'
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        manifest: './public/site.webmanifest'
      },
    },
  },
  optimizeDeps: {
    include: ['gray-matter', 'marked', 'buffer']
  },
  define: {
    'process.env': {},
    'Buffer': ['buffer', 'Buffer'],
  }
}));
