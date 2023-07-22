import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      store: "/src/store",
      types: "/src/types",
      utils: "/src/utils",
      assets: "/src/assets",
      hooks: '/src/hooks'
    }
  }
})
