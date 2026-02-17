import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vn9r43ot',
    dataset: 'production'
  },
  // Tambahkan bagian vite ini
  vite: {
    publicDir: 'static'
  },
  deployment: {
    autoUpdates: true,
  }
})