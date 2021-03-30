<template>
  <v-container>
    <v-alert
      :value="error ? true : false"
      type="error"
      outlined
      transition="slide-y-transition"
      dismissible
      >{{ error }}</v-alert
    >
    <v-dialog v-model="openModal" fullscreen>
      <v-card>
        <v-app-bar dense>
          <v-btn icon color="pink" @click="openModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-spacer />

          <v-toolbar-items>
            <v-btn text color="primary"> Save </v-btn>
          </v-toolbar-items>
        </v-app-bar>
        <v-card>
          <v-card-text>
            <img :src="modalsrc" width="100%" alt="" />
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-text>
        <span v-if="previews.length != 0">
          <v-img
            v-for="(preview, pIndex) in previews"
            :key="pIndex"
            width="200"
            :src="preview"
            :alt="preview"
            :lazy-src="preview"
            @click="getPhoto(preview)"
          />
        </span>
        <template v-if="posts.length != 0">
          <span v-for="(post, i) in posts" :key="i">
            <span
              v-for="photo in post.photos"
              :key="awsCdnUrl + photo.path + photo.created_at"
            >
              <v-img
                width="200"
                loading="lazy"
                :src="awsCdnUrl + photo.path + '?w=200&p=t'"
                :alt="awsCdnUrl + photo.path + photo.created_at"
                @click="getPhoto(awsCdnUrl + photo.path + '?&p=t')"
              />
            </span>
          </span>
        </template>
      </v-card-text>
    </v-card>
    <room-new />
  </v-container>
</template>

<script>
export default {
  middleware: ['not_logined_user', 'logined_user'],

  async asyncData({ store, params }) {
    await store.dispatch('room/index', params.roomId).catch((err) => {
      console.error(err)
      return false
    })
  },

  data() {
    return {
      error: null,
      awsCdnUrl: '',
      previews: [],
      openModal: false,
      modalsrc: null,
    }
  },

  computed: {
    check() {
      return this.$store.getters['auth/check']
    },
    user() {
      return this.$store.getters['auth/user']
    },
    posts() {
      return this.$store.getters['room/index']
    },
  },

  mounted() {
    this.awsCdnUrl = process.env.AWS_CDN_URL
  },

  methods: {
    getPhoto(src) {
      this.openModal = true
      this.modalsrc = src
    },
  },
}
</script>
