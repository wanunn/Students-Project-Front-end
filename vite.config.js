import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'api': JSON.stringify('http://localhost:5000'),
    'token': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3MjI1MDAyOTR9.B49yYwuBLo48VDrrOz4D6Sk_hQn0_UdYd2HyXWmtj0A'),
  }
})
