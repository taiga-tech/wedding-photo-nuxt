<template>
  <v-app>
    <v-dialog v-model="open" width="500" persistent>
      <v-card color="#13151a">
        <v-card-title>
          <v-icon color="#dd2c00" left>mdi-cloud-alert</v-icon>
          <h1 v-if="error.statusCode === 404" style="font-size: 20px">
            {{ pageNotFound }}
          </h1>
          <h1 v-else style="font-size: 20px">
            {{ otherError }}
          </h1>
        </v-card-title>
        <v-card-actions>
          <v-btn text to="/" color="pink">topへ</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" text to="/info/contact/"> お問い合わせ </v-btn>
          <v-btn
            color="#1976d1"
            text
            href="https://twitter.com/Taiga_dev/"
            rel="noopener"
            target="_blank"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      open: true,
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
