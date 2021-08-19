<template>
  <v-container fluid>
    <app-alert :error="error" />

    <v-dialog
      v-if="modalsrc"
      v-model="openmodal"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card height="100%" flat tile>
        <v-app-bar dense>
          <v-btn icon color="pink" @click="closemodal">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
          <v-app-bar-title>@{{ modalsrc.nickname }}</v-app-bar-title>

          <v-spacer />

          <v-toolbar-items>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text dark v-bind="attrs" v-on="on">
                  <v-icon>{{ mdiDotsVertical }}</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="download(index, pullIndex, modalsrc)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
            :alt="modalsrc.photos[pullIndex].path"
            :aspect-ratio="modalsrc.photos[pullIndex].aspect"
            contain
            class="align-end"
            height="90%"
          >
            <v-card-text v-if="modalsrc.message">
              {{ modalsrc.message }}
            </v-card-text>
            <template v-slot:placeholder>
              <app-progresscircle />
            </template>
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
                v-for="(preview, i) in modalsrc.photos"
                :key="preview.path"
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
        <template v-if="previews.length !== 0">
          <div
            v-for="preview in previews"
            :key="preview.path"
            v-masonry-tile="containerId"
            class="item"
          >
            <v-card :loading="loading" :disabled="loading">
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
        </template>

        <div v-for="(post, i) in posts" :key="i">
          <v-card
            v-for="(photo, index) in post.photos"
            :key="photo.path"
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
              <v-chip
                x-small
                outlined
                style="position: absolute; bottom: 0; right: 0"
              >
                {{ $moment(post.created_at).fromNow() }}
              </v-chip>
              <template v-slot:placeholder>
                <app-progresscircle />
              </template>
            </v-img>
          </v-card>
        </div>
      </div>
    </client-only>
    <room-new ref="roomNew" />
  </v-container>
</template>

<script>
import { mdiClose, mdiDotsVertical } from '@mdi/js'
import AuthComputed from '~/assets/mixins/AuthComputed.js'
import UaFilters from '~/assets/mixins/UaFilters'
import ImageSwipe from '~/assets/mixins/ImageSwipe'
import Download from '~/assets/mixins/Download'
import Meta from '~/assets/mixins/Meta'
;(async () => await require('~/assets/sass/masonry.scss'))()

export default {
  components: {
    AppAlert: () => import('~/components/AppAlert'),
    AppProgresscircle: () => import('~/components/AppProgresscircle'),
    RoomNew: () => import('~/components/Room/New'),
  },
  mixins: [AuthComputed, UaFilters, ImageSwipe, Download, Meta],

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
      items: [
        { title: 'この画像のみ保存' },
        { title: 'この投稿の画像を保存' },
        { title: '削除依頼' },
      ],
      meta: {
        title: null,
      },
      mdiClose,
      mdiDotsVertical,
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

  mounted() {
    this.meta.title = this.user.name
  },

  methods: {
    refresh() {
      this.$redrawVueMasonry(this.containerId)
    },

    closemodal() {
      this.openmodal = false
      this.pullIndex = null
      this.modalsrc = null
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
