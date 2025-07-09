import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-prerender',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        // Add entry points for each route
        dashboard: path.resolve(__dirname, 'src/pages/Dashboard.tsx'),
        finance: path.resolve(__dirname, 'src/pages/Finance.tsx'),
        hr: path.resolve(__dirname, 'src/pages/HumanResources.tsx'),
        inventory: path.resolve(__dirname, 'src/pages/Inventory.tsx'),
        sales: path.resolve(__dirname, 'src/pages/Sales.tsx'),
        procurement: path.resolve(__dirname, 'src/pages/Procurement.tsx'),
        manufacturing: path.resolve(__dirname, 'src/pages/Manufacturing.tsx'),
        projects: path.resolve(__dirname, 'src/pages/Projects.tsx'),
        reports: path.resolve(__dirname, 'src/pages/Reports.tsx'),
        faqManagement: path.resolve(__dirname, 'src/pages/FaqManagement.tsx'),
        docsManagement: path.resolve(__dirname, 'src/pages/DocsManagement.tsx'),
        blogManagement: path.resolve(__dirname, 'src/pages/BlogManagement.tsx'),
        userManagement: path.resolve(__dirname, 'src/pages/UserManagement.tsx'),
        profile: path.resolve(__dirname, 'src/pages/ProfileManagement.tsx'),
        settings: path.resolve(__dirname, 'src/pages/Settings.tsx'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
  ssr: {
    noExternal: ['@tanstack/react-query'],
  },
});
