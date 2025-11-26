import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Node modules chunking
          if (id.includes('node_modules')) {
            // Large chart library - separate chunk
            if (id.includes('recharts')) {
              return 'recharts';
            }
            
            // PDF generation - separate chunk
            if (id.includes('jspdf')) {
              return 'pdf-vendor';
            }
            
            // Framer Motion - separate chunk
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            
            // React and React DOM - core vendor
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            
            // Radix UI components - UI vendor
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            
            // Other node_modules - vendor chunk
            return 'vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit (chunks are now properly split)
    chunkSizeWarningLimit: 600,
    // Optimize for production
    sourcemap: false, // Disable sourcemaps for smaller build size
  },
})
