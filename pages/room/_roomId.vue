<template>
  <v-container fluid>
    <app-alert :error="error" />

    <room-new ref="roomNew" />

    <v-dialog
      v-if="modalsrc"
      v-model="openmodal"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-app-bar dense>
          <v-btn icon color="pink" @click="openmodal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-spacer />

          <v-toolbar-items>
            <v-btn text color="primary"> Save </v-btn>
          </v-toolbar-items>
        </v-app-bar>

        <v-card
          max-width="100%"
          max-height="100%"
          align="center"
          justify="center"
          class="pa-3"
        >
          <img
            :src="awsCdnUrl + modalsrc.photos[pullIndex].path + '?p=t'"
            alt=""
            width="90%"
            :style="`pending-bottom: ${
              modalsrc.photos[pullIndex].aspect * 100
            }`"
          />
        </v-card>
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-subtitle>{{ user.login_id }}</v-card-subtitle>
      </v-card>
    </v-dialog>

    <client-only>
      <div
        v-masonry="containerId"
        transition-duration="0.1s"
        item-selector=".item"
        class="masonryWrap"
      >
        <div
          v-for="preview in previews"
          :key="preview.path"
          v-masonry-tile="containerId"
          class="item"
        >
          <v-card hover :loading="loading" :disabled="loading">
            <v-img
              :src="preview.path"
              :aspect-ratio="preview.aspect"
              :alt="preview.path"
              :width="width"
              class="fill-height"
            ></v-img>
          </v-card>
        </div>

        <div v-for="(post, i) in posts" :key="i">
          <v-card
            v-for="(photo, index) in post.photos"
            :key="index"
            v-masonry-tile="containerId"
            hover
            class="item"
            @click="getPhoto(post, index)"
          >
            <v-img
              :src="awsCdnUrl + photo.path + '?p=t'"
              :aspect-ratio="photo.aspect"
              lazy-src="https://picsum.photos/id/11/100/60"
              :alt="photo.created_at"
              :width="width"
              class="fill-height"
              @load="refresh"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="green lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </div>
      </div>
    </client-only>
  </v-container>
</template>

<script>
import AuthComputed from '~/assets/mixins/AuthComputed.js'

export default {
  mixins: [AuthComputed],

  middleware: ['not_logined_user', 'is_admin', 'logined_user'],

  async asyncData({ store, params }) {
    await store.dispatch('room/index', params.roomId).catch((err) => {
      console.error(err)
    })
  },

  data() {
    return {
      error: null,
      width: '100%',
      containerId: 'containerId',
      previews: [],
      openmodal: false,
      modalsrc: null,
      pullIndex: null,
    }
  },

  computed: {
    posts() {
      return this.$store.getters['room/index']
    },
    loading() {
      return this.$refs.roomNew.loading
    },
    awsCdnUrl() {
      return process.env.AWS_CDN_URL
    },
  },

  methods: {
    refresh() {
      this.$redrawVueMasonry(this.containerId)
    },

    getPhoto(post, index) {
      this.openmodal = true
      this.modalsrc = post
      this.pullIndex = index
    },

    async getPhotos() {
      await this.$store
        .dispatch('room/index', this.$route.params.roomId)
        .catch((err) => {
          this.error = err
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  @media only screen and (min-width: 1900px) {
    width: calc(100% / 8 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 1900px) {
    width: calc(100% / 6 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 1300px) {
    width: calc(100% / 5 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 900px) {
    width: calc(100% / 3 - 24px);
    margin: 10px;
  }
  @media only screen and (max-width: 599px) {
    width: calc(100% / 2 - 24px);
    margin: 10px;
  }
}
</style>
