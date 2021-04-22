<template>
  <v-container fluid>
    <app-alert :error="error" />

    <demo-info />

    <demo-new ref="roomNew" />

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
          <v-app-bar-title>@{{ modalsrc.nickname }}</v-app-bar-title>

          <v-spacer />
        </v-app-bar>

        <v-card
          max-width="100%"
          max-height="100%"
          align="center"
          justify="center"
          class="pa-3"
        >
          <v-img
            :src="conversion(awsCdnUrl, modalsrc.photos[pullIndex].path)"
            :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
            :alt="modalsrc.photos[pullIndex].path"
            :aspect-ratio="modalsrc.photos[pullIndex].aspect"
            width="90%"
            class="align-end"
          >
            <v-card-text v-if="modalsrc.message">
              {{ modalsrc.message }}
            </v-card-text>
          </v-img>
        </v-card>

        <div v-if="modalsrc.photos.length >= 2">
          <client-only>
            <div
              v-masonry="containerId"
              transition-duration="0.1s"
              item-selector=".item"
              class="masonryWrap"
            >
              <div
                v-for="(photo, i) in modalsrc.photos"
                :key="photo.path"
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
                    :src="conversion(awsCdnUrl, photo.path)"
                    :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
                    :aspect-ratio="photo.aspect"
                    :alt="photo.path"
                    :width="width"
                    class="fill-height"
                  />
                </v-card>
              </div>
            </div>
          </client-only>
        </div>
      </v-card>
    </v-dialog>

    <client-only>
      <div
        v-masonry="containerId"
        transition-duration="0.1s"
        item-selector=".item"
        class="masonryWrap"
      >
        <div v-for="post in sessionPosts" :key="post.creagted_at">
          <v-card
            v-for="(photo, index) in post.photos"
            :key="index"
            v-masonry-tile="containerId"
            class="item"
            hover
            :loading="loading"
            :disabled="loading"
            @click="getPhoto(post, index)"
          >
            <v-img
              :src="photo.path"
              :lazy-src="conversion(awsCdnUrl, 'img/lazy.jpg')"
              :alt="photo.path"
              :aspect-ratio="photo.aspect"
              :width="width"
              class="fill-height"
              align="right"
              @load="refresh"
            >
              <v-card-text>@{{ post.nickname }}</v-card-text>
            </v-img>
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
              :alt="photo.created_at"
              :aspect-ratio="photo.aspect"
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
    <app-footer />
  </v-container>
</template>

<script>
import posts from '~/assets/json/DemoData'
import UaFilters from '~/assets/mixins/UaFilters'

export default {
  mixins: [UaFilters],

  data() {
    return {
      error: null,
      width: '100%',
      containerId: 'containerId',
      openmodal: false,
      modalsrc: null,
      posts,
      sessionPosts: [],
      pullIndex: null,
    }
  },

  computed: {
    loading() {
      return this.$refs.roomNew.loading
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
  },

  head() {
    return {
      title: 'デモ - ',
    }
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
