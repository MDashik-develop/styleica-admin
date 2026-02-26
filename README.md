
## ecosystem.config.cjs
```js
module.exports = {
  apps: [
    {
      name: 'genters-admin',
      script: 'npm',
      args: 'run preview',
      cwd: '/var/www/Genters-Admin-Frontend',
      env: {
        PORT: 4000
      },
      instances: 1,
      exec_mode: 'fork'
    }
  ]
};
```

## vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    port: 4000,
    host: '0.0.0.0',
    allowedHosts: ['ad.genters.com.bd', 'localhost']
  },
  server: {
    port: 4000,
    host: '0.0.0.0'
  }
})
```
