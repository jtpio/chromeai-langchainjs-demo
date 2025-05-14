import { defineConfig } from 'vite'

// Extract the repo name from the GitHub repository URL
// This assumes your repo is at github.com/jtpio/chromeai-langchain-demo
const repoName = 'chromeai-langchain-demo'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
})
