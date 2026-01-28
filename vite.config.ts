import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This is crucial: it maps the process.env.API_KEY usage in your code 
      // to the actual environment variable during the build process.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
    }
  }
})