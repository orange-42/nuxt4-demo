// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-25',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon'
  ],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    exposeConfig: false,
    viewer: true,
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nuxt4-todo'
  }
})
