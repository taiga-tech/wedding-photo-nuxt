<template>
  <v-app dark>
    <v-overlay :value="loading" color="#12151d" opacity="1" z-index="9999">
      <div class="loader">
        <v-progress-circular
          :size="50"
          :width="3"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-overlay>
    <app-bar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: { AppBar: () => import('~/components/AppBar') },

  data() {
    return { loading: true }
  },
  computed: {
    currentPageForCanonical() {
      return this.$route.path.slice(1)
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.loading = false
    })
    // setTimeout(() => (this.loading = false), 1000)
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
