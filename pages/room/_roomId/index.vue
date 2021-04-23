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
      <v-card height="100%" flat tile>
        <v-app-bar dense>
          <v-btn icon color="pink" @click="openmodal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-app-bar-title>@{{ modalsrc.nickname }}</v-app-bar-title>

          <v-spacer />

          <v-toolbar-items>
            <v-btn text color="primary"> Save </v-btn>
          </v-toolbar-items>
        </v-app-bar>

        <v-card
          max-width="100%"
          max-height="100%"
          height="100%"
          align="center"
          justify="center"
          class="pa-3"
          flat
          tile
        >
          <v-img
            v-touch="{
              left: () => swipe(1),
              right: () => swipe(-1),
            }"
            :src="conversion(awsCdnUrl, modalsrc.photos[pullIndex].path)"
            :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
            :alt="modalsrc.photos[pullIndex].path"
            :aspect-ratio="modalsrc.photos[pullIndex].aspect"
            contain
            class="align-end"
            height="90%"
          >
            <v-card-text v-if="modalsrc.message">
              {{ modalsrc.message }}
            </v-card-text>
          </v-img>
        </v-card>
        <v-card v-if="modalsrc.photos.length >= 2" flat tile>
          <client-only>
            <div
              v-masonry="containerId"
              transition-duration="0.1s"
              item-selector=".item"
              class="masonryWrap"
            >
              <div
                v-for="(preview, i) in modalsrc.photos"
                :key="preview.path"
                v-masonry-tile="containerId"
                class="item"
              >
                <v-card
                  hover
                  :loading="loading"
                  :disabled="loading"
                  @click="getPhoto(modalsrc, i)"
                >
                  <v-img
                    :src="conversion(awsCdnUrl, preview.path)"
                    :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
                    :aspect-ratio="preview.aspect"
                    :alt="preview.path"
                    :width="width"
                    class="fill-height"
                  />
                </v-card>
              </div>
            </div>
          </client-only>
        </v-card>
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
              :src="conversion(awsCdnUrl, preview.path)"
              :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
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
              :src="conversion(awsCdnUrl, photo.path)"
              :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
              :aspect-ratio="photo.aspect"
              :alt="photo.created_at"
              :width="width"
              class="fill-height"
              align="right"
              @load="refresh"
            >
              <v-card-text>@{{ post.nickname }}</v-card-text>
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
import UaFilters from '~/assets/mixins/UaFilters'
import ImageSwipe from '~/assets/mixins/ImageSwipe'

export default {
  mixins: [AuthComputed, UaFilters, ImageSwipe],

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

<style lang="scss" src="~/assets/sass/masonry.scss" scoped />
