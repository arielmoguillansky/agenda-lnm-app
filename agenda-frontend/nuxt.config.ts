// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ],
      script: [
        { tagPosition: 'bodyClose', src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_TOKEN}&libraries=places`, async: true }
      ],
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  runtimeConfig: {
    public: {
      apiUrl: `${process.env.BASE_URL}${process.env.API_URL}` || 'http://localhost',
      assetUrl: `${process.env.BASE_URL}${process.env.ASSET_URL}` || 'http://localhost'
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {}, 
      autoprefixer: {},
    },
  },
})
