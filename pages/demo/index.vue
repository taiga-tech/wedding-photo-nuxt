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
      <v-card height="100%" flat tile>
        <v-app-bar dense>
          <v-btn icon color="pink" @click="openmodal = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
          <v-app-bar-title>@{{ modalsrc.nickname }}</v-app-bar-title>
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
              v-masonry="'preContainerId'"
              transition-duration="0.1s"
              item-selector=".item"
              class="masonryWrap"
            >
              <div
                v-for="(photo, i) in modalsrc.photos"
                :key="photo.path"
                v-masonry-tile="'preContainerId'"
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
                <app-progresscircle />
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
import { mdiClose } from '@mdi/js'
import posts from '~/assets/json/DemoData'
import UaFilters from '~/assets/mixins/UaFilters'
import ImageSwipe from '~/assets/mixins/ImageSwipe'
import Meta from '~/assets/mixins/Meta'
;(async () => await require('~/assets/sass/masonry.scss'))()

export default {
  components: {
    AppAlert: () => import('~/components/AppAlert'),
    DemoInfo: () => import('~/components/Demo/Info'),
    DemoNew: () => import('~/components/Demo/New'),
    AppProgresscircle: () => import('~/components/AppProgresscircle'),
    AppFooter: () => import('~/components/AppFooter'),
  },
  mixins: [Meta, UaFilters, ImageSwipe],

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
      meta: {
        title: 'デモ',
        description:
          'デモページへようこそ！このページではログイン後の動作を再現しています | Wedding Photo Album みんなでひとつだけのフォトアルバム',
      },
      mdiClose,
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
}
</script>
