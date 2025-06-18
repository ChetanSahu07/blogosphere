import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD

  server:{
    proxy:{
=======
  server : {
    proxy : {
>>>>>>> 0a68494 (final commit)
      '/api' : "http://localhost:5000"
    }
  },
  plugins: [react() , tailwindcss() ],
  
})


// https://blogosphere-backend-w3ra.onrender.com
