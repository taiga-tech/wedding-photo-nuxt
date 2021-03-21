<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center"></div>
      <v-card>
        <pre v-if="posts">{{ posts }}</pre>
        <v-btn @click="getApi">go</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      posts: null,
    }
  },
  methods: {
    async getApi() {
      const response = await this.$axios.$get('/api/posts/')

      this.posts = response
    },
  },
}
</script>
