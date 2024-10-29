// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 devtools: { enabled: true },

 modules: [
   '@formkit/nuxt',
   '@nuxtjs/color-mode',
   '@nuxtjs/tailwindcss',
   'nuxt-gtag',
   '@pinia/nuxt',
   "@nuxtjs/seo",
 ],

 colorMode: {
   classSuffix: '',
   // preference: 'system',
   // fallback: 'dark',
 },

 nitro: {
   preset: "firebase",
   firebase: {
     gen: 2,
   }
 },

 ogImage: {
  enabled: false
 },

 gtag: {
  id: 'G-5D88JFDJZH',
 },

 css: [
  '@fortawesome/fontawesome-svg-core/styles.css'
 ],

 site: {
   url: 'https://jacobmiller.io',
   name: 'Jacob Miller',
   description: '',
   defaultLocale: 'en',
 },

 compatibilityDate: '2024-10-29',
})