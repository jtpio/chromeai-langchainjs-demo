import { defineConfig } from 'vite'

const repoName = 'chromeai-langchainjs-demo'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
})
