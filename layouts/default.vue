<template>
  <v-app dark>
    <app-bar />

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    currentPageForCanonical() {
      return this.$route.path.slice(1)
    },
  },

  head() {
    return {
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.APP_URL}${this.currentPageForCanonical}`,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `${process.env.APP_URL}${this.currentPageForCanonical}`,
        },
      ],
    }
  },
}
</script>
