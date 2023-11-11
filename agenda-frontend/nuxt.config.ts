// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
     '@vee-validate/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost'
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {}, 
      autoprefixer: {},
    },
  },
})
